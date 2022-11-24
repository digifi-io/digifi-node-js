import { AuthorizedApiClient } from '../../clients';
import { Branding } from '../../data/models';

class BrandingApi {
  protected path = '/branding'

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public getBranding(): Promise<Branding> {
    return this.apiClient.makeCall(`${this.path}`);
  }
}

export default BrandingApi;
