import fetch, { FetchError, Headers, Response } from 'node-fetch';
import { mock } from 'jest-mock-extended';
import { ApiRequestError, NetworkError } from '../errors';
import ApiClient, { ApiClientLogger, ApiClientOptions } from './ApiClient';

jest.mock('node-fetch', () => ({
  ...jest.requireActual('node-fetch'),
  __esModule: true,
  default: jest.fn(),
}));

const BASE_URL = 'https://core.digifi.test/api';
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const defaultOptions: ApiClientOptions = { apiVersion: '2026-08-10' };

const createJsonResponse = (status: number, body: unknown, headers: Record<string, string> = {}) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
};

const getRequest = (callIndex = 0) => {
  const [url, init] = jest.mocked(fetch).mock.calls[callIndex];

  return {
    url,
    method: init?.method,
    headers: init?.headers as Headers,
    body: init?.body,
  };
};

const getApiRequestError = async (promise: Promise<unknown>) => {
  const error = await promise.then(
    () => undefined,
    (rejection: unknown) => rejection,
  );

  expect(error).toBeInstanceOf(ApiRequestError);

  return error as ApiRequestError;
};

describe('ApiClient', () => {
  const fetchMock = jest.mocked(fetch);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('makeCall', () => {
    it('sends a GET request to baseUrl + path with api-version and JSON headers by default', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, defaultOptions).makeCall('/applications?count=10');

      expect(fetchMock).toHaveBeenCalledTimes(1);

      const request = getRequest();

      expect(request.url).toBe(`${BASE_URL}/applications?count=10`);
      expect(request.method).toBe('GET');
      expect(request.body).toBeUndefined();
      expect(request.headers.get('api-version')).toBe('2026-08-10');
      expect(request.headers.get('accept')).toBe('application/json');
      expect(request.headers.get('content-type')).toBe('application/json');
    });

    it('JSON-stringifies object bodies', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, defaultOptions).makeCall('/tasks', 'PUT', { title: 'Task', ids: [1, 2] });

      expect(getRequest().method).toBe('PUT');
      expect(getRequest().body).toBe('{"title":"Task","ids":[1,2]}');
    });

    it('sends string bodies as they are', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, defaultOptions).makeCall('/raw', 'POST', 'plain body');

      expect(getRequest().body).toBe('plain body');
    });

    it('does not set Accept and Content-Type when contentType is null', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, defaultOptions).makeCall('/upload', 'POST', 'body', { contentType: null });

      expect(getRequest().headers.has('accept')).toBe(false);
      expect(getRequest().headers.has('content-type')).toBe(false);
    });

    it('adds custom headers and lets them override the basic ones', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, defaultOptions).makeCall('/resource', 'GET', undefined, {
        headers: new Headers({ 'x-custom': 'value', 'api-version': 'override' }),
      });

      expect(getRequest().headers.get('x-custom')).toBe('value');
      expect(getRequest().headers.get('api-version')).toBe('override');
    });
  });

  describe('idempotency key', () => {
    const idempotencyOptions: ApiClientOptions = {
      ...defaultOptions,
      enableIdempotencyHeader: true,
      maxNetworkRetries: 1,
    };

    it('adds a new generated UUID to every POST request when enabled and retries are configured', async () => {
      fetchMock.mockImplementation(async () => createJsonResponse(200, {}));

      const client = new ApiClient(BASE_URL, idempotencyOptions);

      await client.makeCall('/resource', 'POST', {});
      await client.makeCall('/resource', 'POST', {});

      const firstKey = getRequest(0).headers.get('idempotency-key');
      const secondKey = getRequest(1).headers.get('idempotency-key');

      expect(firstKey).toMatch(UUID_REGEX);
      expect(secondKey).toMatch(UUID_REGEX);
      expect(firstKey).not.toBe(secondKey);
    });

    it('does not add the key when retries are not configured', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, { ...defaultOptions, enableIdempotencyHeader: true })
        .makeCall('/resource', 'POST', {});

      expect(getRequest().headers.has('idempotency-key')).toBe(false);
    });

    it.each(['GET', 'PUT', 'PATCH', 'DELETE'] as const)('does not add the key to %s requests', async (method) => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, idempotencyOptions).makeCall('/resource', method, {});

      expect(getRequest().headers.has('idempotency-key')).toBe(false);
    });

    it('uses an explicit idempotency key even when the option is off', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, {}));

      await new ApiClient(BASE_URL, defaultOptions).makeCall('/resource', 'POST', {}, { idempotencyKey: 'my-key' });

      expect(getRequest().headers.get('idempotency-key')).toBe('my-key');
    });
  });

  describe('successful responses', () => {
    it('returns the parsed JSON body', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(200, { id: 'app-1', items: [1, 2] }));

      const result = await new ApiClient(BASE_URL, defaultOptions).makeCall('/applications/app-1');

      expect(result).toEqual({ id: 'app-1', items: [1, 2] });
    });

    it('returns the raw response when the responseType header is arraybuffer', async () => {
      const response = new Response(Buffer.from([1, 2, 3]), { status: 200 });

      fetchMock.mockResolvedValue(response);

      const result = await new ApiClient(BASE_URL, defaultOptions).makeCall('/files/1', 'GET', undefined, {
        headers: new Headers({ responseType: 'arraybuffer' }),
      });

      expect(result).toBe(response);
    });

    it('logs request metadata with the request id', async () => {
      const logger = mock<ApiClientLogger>();

      fetchMock.mockResolvedValue(createJsonResponse(200, {}, { 'x-request-id': 'req-1' }));

      await new ApiClient(BASE_URL, { ...defaultOptions, logger }).makeCall('/resource', 'PUT', {});

      expect(logger.info).toHaveBeenCalledTimes(1);
      expect(logger.info).toHaveBeenCalledWith({
        url: `${BASE_URL}/resource`,
        method: 'PUT',
        duration: expect.any(Number),
        statusCode: 200,
        requestId: 'req-1',
      });
      expect(logger.error).not.toHaveBeenCalled();
    });
  });

  describe('error responses', () => {
    it('uses the first message of a NestJS validation error and does not split `error` into characters', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(400, {
        statusCode: 400,
        message: ['id must be a valid identifier', 'second message'],
        error: 'Bad Request',
      }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/quiltt/connections/x'));

      expect(error.message).toBe('id must be a valid identifier');
      expect(error.responseStatus).toBe(400);
      expect(error.code).toBeUndefined();
      expect(error.data).toEqual({ statusCode: 400, error: 'Bad Request' });
    });

    it('uses the string message of a NestJS error', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(404, {
        statusCode: 404,
        message: 'Connection not found',
        error: 'Not Found',
      }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.message).toBe('Connection not found');
      expect(error.responseStatus).toBe(404);
      expect(error.data).toEqual({ statusCode: 404, error: 'Not Found' });
    });

    it('keeps the top-level message and code of a { message, code, data } body and uses data as error data', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(404, {
        message: 'Application not found',
        code: 'APPLICATION_NOT_FOUND',
        data: { applicationId: 'abc' },
      }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/applications/abc'));

      expect(error.message).toBe('Application not found');
      expect(error.code).toBe('APPLICATION_NOT_FOUND');
      expect(error.data).toEqual({ applicationId: 'abc' });
    });

    it('reads message, code and data from an { error: { ... } } body', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(400, {
        error: { message: 'Invalid code', code: 'INVALID_CODE', attemptsLeft: 2 },
      }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.message).toBe('Invalid code');
      expect(error.code).toBe('INVALID_CODE');
      expect(error.data).toEqual({ attemptsLeft: 2 });
    });

    it('falls back to data.error for the message', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(422, { data: { error: 'Something is wrong' } }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.message).toBe('Something is wrong');
      expect(error.data).toEqual({ error: 'Something is wrong' });
    });

    it.each([123, 'CODE'])('keeps the code %p as it is', async (code) => {
      fetchMock.mockResolvedValue(createJsonResponse(400, { message: 'Bad', code }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.code).toBe(code);
    });

    it('keeps a numeric code inside an { error: { ... } } body', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(404, { error: { message: 'Not found', code: 404 } }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.code).toBe(404);
    });

    it.each([{ id: 1 }, true])('ignores the code %p when it is neither a string nor a number', async (code) => {
      fetchMock.mockResolvedValue(createJsonResponse(400, { message: 'Bad', code }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.code).toBeUndefined();
    });

    it('uses the status text when the body is not JSON', async () => {
      fetchMock.mockResolvedValue(new Response('<html>Bad gateway</html>', { status: 502 }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.message).toBe('Bad Gateway');
      expect(error.responseStatus).toBe(502);
      expect(error.code).toBeUndefined();
      expect(error.data).toBeUndefined();
    });

    it.each([
      ['null', null],
      ['a plain string', 'oops'],
      ['an array', ['oops']],
    ])('uses the status text when the JSON body is %s', async (_, body) => {
      fetchMock.mockResolvedValue(createJsonResponse(400, body));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.message).toBe('Bad Request');
      expect(error.data).toEqual({});
    });

    it('exposes the request id and response headers', async () => {
      fetchMock.mockResolvedValue(createJsonResponse(400, { message: 'Bad' }, { 'x-request-id': 'req-42' }));

      const error = await getApiRequestError(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(error.requestId).toBe('req-42');
      expect(error.responseHeaders?.get('x-request-id')).toBe('req-42');
    });

    it('logs the error with request metadata', async () => {
      const logger = mock<ApiClientLogger>();

      fetchMock.mockResolvedValue(createJsonResponse(400, { message: 'Bad' }, { 'x-request-id': 'req-7' }));

      const error = await getApiRequestError(
        new ApiClient(BASE_URL, { ...defaultOptions, logger }).makeCall('/resource', 'DELETE'),
      );

      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith(error, {
        url: `${BASE_URL}/resource`,
        method: 'DELETE',
        duration: expect.any(Number),
        statusCode: 400,
        requestId: 'req-7',
      });
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('turns fetch failures into NetworkError', async () => {
      fetchMock.mockRejectedValue(new FetchError('request failed, reason: connect ECONNREFUSED', 'system'));

      await expect(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource')).rejects.toThrow(NetworkError);
    });
  });

  describe('retries', () => {
    const retryOptions: ApiClientOptions = { ...defaultOptions, maxNetworkRetries: 2 };

    beforeEach(() => {
      jest.useFakeTimers();
      // The retry backoff is randomized between 1x and 2x of the base delay; pin it to 1x.
      jest.spyOn(Math, 'random').mockReturnValue(0);
    });

    afterEach(() => {
      jest.useRealTimers();
      jest.restoreAllMocks();
    });

    const runToSettlement = async <Result>(promise: Promise<Result>) => {
      const settled = promise.then(
        (value) => ({ value }),
        (error: unknown) => ({ error }),
      );

      await jest.runAllTimersAsync();

      return settled;
    };

    it('does not retry when maxNetworkRetries is not set', async () => {
      fetchMock.mockImplementation(async () => createJsonResponse(503, {}));

      const result = await runToSettlement(new ApiClient(BASE_URL, defaultOptions).makeCall('/resource'));

      expect(result).toEqual({ error: expect.any(ApiRequestError) });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it.each([409, 500, 503])('retries %s responses up to maxNetworkRetries times', async (status) => {
      fetchMock.mockImplementation(async () => createJsonResponse(status, { message: 'Try again' }));

      const result = await runToSettlement(new ApiClient(BASE_URL, retryOptions).makeCall('/resource'));

      expect(result).toEqual({ error: expect.objectContaining({ responseStatus: status }) });
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it.each([400, 401, 404, 422])('does not retry %s responses', async (status) => {
      fetchMock.mockImplementation(async () => createJsonResponse(status, { message: 'No' }));

      const result = await runToSettlement(new ApiClient(BASE_URL, retryOptions).makeCall('/resource'));

      expect(result).toEqual({ error: expect.objectContaining({ responseStatus: status }) });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('retries a 4xx response when the digifi-should-retry header is true', async () => {
      fetchMock.mockImplementation(async () => {
        return createJsonResponse(400, { message: 'Retry me' }, { 'digifi-should-retry': 'true' });
      });

      await runToSettlement(new ApiClient(BASE_URL, retryOptions).makeCall('/resource'));

      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it('retries network errors and rejects with NetworkError when retries run out', async () => {
      fetchMock.mockRejectedValue(new FetchError('request failed, reason: socket hang up', 'system'));

      const result = await runToSettlement(new ApiClient(BASE_URL, retryOptions).makeCall('/resource'));

      expect(result).toEqual({ error: expect.any(NetworkError) });
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it('returns the response once a retry succeeds', async () => {
      fetchMock
        .mockResolvedValueOnce(createJsonResponse(503, {}))
        .mockResolvedValueOnce(createJsonResponse(200, { ok: true }));

      const result = await runToSettlement(new ApiClient(BASE_URL, retryOptions).makeCall('/resource'));

      expect(result).toEqual({ value: { ok: true } });
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('waits 1s and then 2s between retries', async () => {
      fetchMock.mockImplementation(async () => createJsonResponse(503, {}));

      const startedAt = Date.now();

      await runToSettlement(new ApiClient(BASE_URL, retryOptions).makeCall('/resource'));

      expect(Date.now() - startedAt).toBe(1_000 + 2_000);
    });

    it('sends the same idempotency key on every retry', async () => {
      fetchMock
        .mockResolvedValueOnce(createJsonResponse(503, {}))
        .mockResolvedValueOnce(createJsonResponse(200, {}));

      await runToSettlement(
        new ApiClient(BASE_URL, { ...retryOptions, enableIdempotencyHeader: true }).makeCall('/resource', 'POST', {}),
      );

      expect(getRequest(0).headers.get('idempotency-key')).toMatch(UUID_REGEX);
      expect(getRequest(1).headers.get('idempotency-key')).toBe(getRequest(0).headers.get('idempotency-key'));
    });
  });
});
