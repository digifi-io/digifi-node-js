import { Headers } from 'node-fetch';

export default class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly responseStatus: number,
    readonly responseHeaders?: Headers,
  ) {
    super(message);
  }
}
