export default class ApiRequestError extends Error {
  constructor(message: string, readonly responseStatus: number) {
    super(message);
  }
}
