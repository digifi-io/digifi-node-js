import { Headers } from 'node-fetch';

class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly responseStatus: number,
    readonly responseHeaders?: Headers,
  ) {
    super(message);
  }
}

export default ApiRequestError;
