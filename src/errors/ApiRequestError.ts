import { Headers } from 'node-fetch';
import {ResponseHeader} from "../enums/ResponseHeader";

class ApiRequestError extends Error {
  public readonly requestId: string | null;

  constructor(
    message: string,
    readonly responseStatus: number,
    readonly responseHeaders?: Headers,
    readonly code?: string,
    readonly data?: object,
  ) {
    super(message);

    this.requestId = responseHeaders?.get(ResponseHeader.RequestId) ?? null;
  }
}

export default ApiRequestError;
