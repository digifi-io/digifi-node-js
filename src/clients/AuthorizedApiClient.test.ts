import fetch, { Headers, Response } from 'node-fetch';
import { ApiClientOptions } from './ApiClient';
import AuthorizedApiClient from './AuthorizedApiClient';

jest.mock('node-fetch', () => ({
  ...jest.requireActual('node-fetch'),
  __esModule: true,
  default: jest.fn(),
}));

const BASE_URL = 'https://core.digifi.test/api';
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const defaultOptions: ApiClientOptions = { apiVersion: '2026-08-10' };

const getRequestHeaders = (callIndex = 0) => {
  const [, init] = jest.mocked(fetch).mock.calls[callIndex];

  return init?.headers as Headers;
};

describe('AuthorizedApiClient', () => {
  const fetchMock = jest.mocked(fetch);

  beforeEach(() => {
    jest.resetAllMocks();

    fetchMock.mockImplementation(async () => new Response('{}', { status: 200 }));
  });

  it('adds the api-key header next to the basic headers', async () => {
    await new AuthorizedApiClient(BASE_URL, 'secret-key', defaultOptions).makeCall('/applications');

    expect(getRequestHeaders().get('api-key')).toBe('secret-key');
    expect(getRequestHeaders().get('api-version')).toBe('2026-08-10');
    expect(getRequestHeaders().get('content-type')).toBe('application/json');
  });

  it('adds a generated idempotency key to POST requests when enabled and retries are configured', async () => {
    const client = new AuthorizedApiClient(BASE_URL, 'secret-key', {
      ...defaultOptions,
      enableIdempotencyHeader: true,
      maxNetworkRetries: 1,
    });

    await client.makeCall('/resource', 'POST', {});

    expect(getRequestHeaders().get('idempotency-key')).toMatch(UUID_REGEX);
  });

  it('uses an explicit idempotency key even when the option is off', async () => {
    await new AuthorizedApiClient(BASE_URL, 'secret-key', defaultOptions)
      .makeCall('/resource', 'POST', {}, { idempotencyKey: 'my-key' });

    expect(getRequestHeaders().get('idempotency-key')).toBe('my-key');
  });

  it('uses an explicit idempotency key instead of a generated one when the option is on', async () => {
    const client = new AuthorizedApiClient(BASE_URL, 'secret-key', {
      ...defaultOptions,
      enableIdempotencyHeader: true,
      maxNetworkRetries: 1,
    });

    await client.makeCall('/resource', 'POST', {}, { idempotencyKey: 'my-key' });

    expect(getRequestHeaders().get('idempotency-key')).toBe('my-key');
  });
});
