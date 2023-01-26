import { IApiClient } from '../../clients';

export type AuthReference = 'borrowers' | 'intermediaries';

export default class AuthApi {
  constructor(
    private apiClient: IApiClient,
    private reference: AuthReference,
  ) {}

  protected makeAuthCall<Response>(...args: Parameters<IApiClient['makeCall']>) {
    const [path, ...restArgs] = args;

    return this.apiClient.makeCall<Response>(
      `/${this.reference}/${path}`,
      ...restArgs,
    );
  }
}
