import { AuthorizedApiClient, IApiClient, ApiClientOptions } from '../clients';
import {
  ApplicationDecisionProcessingApi,
  ApplicationDecisionProcessingRestApi,
  ApplicationDocumentConfigurationApi,
  ApplicationDocumentConfigurationRestApi,
  ApplicationDocumentsApi,
  ApplicationDocumentsRestApi,
  ApplicationDocumentsDownloadsApi,
  ApplicationDocumentsDownloadsRestApi,
  ApplicationDocumentsPreviewApi,
  ApplicationDocumentsPreviewRestApi,
  ApplicationIntegrationProcessingApi,
  ApplicationIntegrationProcessingRestApi,
  ApplicationNotesApi,
  ApplicationNotesRestApi,
  ApplicationsApi,
  ApplicationsRestApi,
  ApplicationStatusesApi,
  ApplicationStatusesRestApi,
  BorrowerAccountsRestApi,
  BorrowerEmailVerificationRestApi,
  BorrowerInvitesRestApi,
  BorrowerPhoneVerificationRestApi,
  BorrowerResetPasswordRestApi,
  BorrowersApi,
  BorrowersRestApi,
  BorrowerSessionsRestApi,
  BorrowerStandardPortalCustomCssConfigApi,
  BorrowerStandardPortalCustomCssConfigRestApi,
  BorrowerStandardPortalGeneralSettingsApi,
  BorrowerStandardPortalGeneralSettingsRestApi,
  BorrowerStandardPortalLegalConsentsApi,
  BorrowerStandardPortalLegalConsentsRestApi,
  BrandingApi,
  BrandingRestApi,
  CommentsApi,
  CommentsRestApi,
  DecisionProcessingApi,
  DecisionProcessingRestApi,
  DecisionsApi,
  DecisionsRestApi,
  DocuSignRestApi,
  IntegrationFileDownloadApi,
  IntegrationFileDownloadRestApi,
  IntegrationProcessingApi,
  IntegrationProcessingRestApi,
  IntegrationResultFilesApi,
  IntegrationResultFilesRestApi,
  IntegrationResultsApi,
  IntegrationResultsRestApi,
  IntermediariesApi,
  IntermediariesRestApi,
  IntermediaryAccountsRestApi,
  IntermediaryEmailVerificationRestApi,
  IntermediaryInvitesRestApi,
  IntermediaryPhoneVerificationRestApi,
  IntermediaryResetPasswordRestApi,
  IntermediarySessionsRestApi,
  LayoutConfigurationApi,
  LayoutConfigurationRestApi,
  ProductCalculationsApi,
  ProductCalculationsRestApi,
  ProductsApi,
  ProductsRestApi,
  TasksApi,
  TasksRestApi,
  UsersApi,
  UsersRestApi,
  VariablesApi,
  VariablesRestApi,
  WebhookEndpointsApi,
  WebhookEndpointsRestApi,
} from '.';
import {
  AccountsApi,
  EmailVerificationApi,
  InvitesApi,
  PhoneVerificationApi,
  ResetPasswordApi,
  SessionsApi,
} from './abstract';

class DigifiApi {
  public borrowerAccounts: AccountsApi;
  public borrowerEmailVerification: EmailVerificationApi;
  public borrowerInvites: InvitesApi;
  public borrowerPhoneVerification: PhoneVerificationApi;
  public borrowerResetPassword: ResetPasswordApi;
  public borrowerSessions: SessionsApi;

  public intermediaryAccounts: AccountsApi;
  public intermediaryEmailVerification: EmailVerificationApi;
  public intermediaryInvites: InvitesApi;
  public intermediaryPhoneVerification: PhoneVerificationApi;
  public intermediaryResetPassword: ResetPasswordApi;
  public intermediarySessions: SessionsApi;

  public borrowerStandardPortalCustomCssConfig: BorrowerStandardPortalCustomCssConfigApi;
  public borrowerStandardPortalGeneralSettings: BorrowerStandardPortalGeneralSettingsApi;
  public borrowerStandardPortalLegalConsents: BorrowerStandardPortalLegalConsentsApi;
  public branding: BrandingApi;

  public decisionProcessing: DecisionProcessingApi;
  public decisions: DecisionsApi;

  public integrationFileDownload: IntegrationFileDownloadApi;
  public integrationProcessing: IntegrationProcessingApi;
  public integrationResultFiles: IntegrationResultFilesApi;
  public integrationResults: IntegrationResultsApi;

  public applicationDecisionProcessing: ApplicationDecisionProcessingApi;
  /**
   * @deprecated This api is deprecated and will be removed in the next major version.
   */
  public applicationDocumentConfiguration: ApplicationDocumentConfigurationApi;
  public applicationDocuments: ApplicationDocumentsApi;
  public applicationDocumentsDownloads: ApplicationDocumentsDownloadsApi;
  public applicationDocumentsPreview: ApplicationDocumentsPreviewApi;
  public applicationIntegrationProcessing: ApplicationIntegrationProcessingApi;
  public applicationNotes: ApplicationNotesApi;
  public applications: ApplicationsApi;
  public applicationStatuses: ApplicationStatusesApi;
  public borrowers: BorrowersApi;
  public comments: CommentsApi;
  public intermediaries: IntermediariesApi;
  /**
   * @deprecated This api is deprecated and will be removed in the next major version.
   */
  public layoutConfiguration: LayoutConfigurationApi;
  public productCalculations: ProductCalculationsApi;
  public products: ProductsApi;
  public tasks: TasksApi;

  public users: UsersApi;
  public variables: VariablesApi;
  public webhookEndpoints: WebhookEndpointsApi;

  public docuSign: DocuSignRestApi;

  private readonly apiClient: IApiClient;

  constructor(
    private baseUrl: string,
    protected apiKey: string,
    protected options: ApiClientOptions,
  ) {
    this.apiClient = new AuthorizedApiClient(this.baseUrl, this.apiKey, this.options);

    this.borrowerAccounts = new BorrowerAccountsRestApi(this.apiClient);
    this.borrowerEmailVerification = new BorrowerEmailVerificationRestApi(this.apiClient);
    this.borrowerInvites = new BorrowerInvitesRestApi(this.apiClient);
    this.borrowerPhoneVerification = new BorrowerPhoneVerificationRestApi(this.apiClient);
    this.borrowerResetPassword = new BorrowerResetPasswordRestApi(this.apiClient);
    this.borrowerSessions = new BorrowerSessionsRestApi(this.apiClient);

    this.intermediaryAccounts = new IntermediaryAccountsRestApi(this.apiClient);
    this.intermediaryEmailVerification = new IntermediaryEmailVerificationRestApi(this.apiClient);
    this.intermediaryInvites = new IntermediaryInvitesRestApi(this.apiClient);
    this.intermediaryPhoneVerification = new IntermediaryPhoneVerificationRestApi(this.apiClient);
    this.intermediaryResetPassword = new IntermediaryResetPasswordRestApi(this.apiClient);
    this.intermediarySessions = new IntermediarySessionsRestApi(this.apiClient);

    this.borrowerStandardPortalCustomCssConfig = new BorrowerStandardPortalCustomCssConfigRestApi(this.apiClient);
    this.borrowerStandardPortalGeneralSettings = new BorrowerStandardPortalGeneralSettingsRestApi(this.apiClient);
    this.borrowerStandardPortalLegalConsents = new BorrowerStandardPortalLegalConsentsRestApi(this.apiClient);
    this.branding = new BrandingRestApi(this.apiClient);

    this.decisionProcessing = new DecisionProcessingRestApi(this.apiClient);
    this.decisions = new DecisionsRestApi(this.apiClient);

    this.integrationFileDownload = new IntegrationFileDownloadRestApi(this.apiClient);
    this.integrationProcessing = new IntegrationProcessingRestApi(this.apiClient);
    this.integrationResultFiles = new IntegrationResultFilesRestApi(this.apiClient);
    this.integrationResults = new IntegrationResultsRestApi(this.apiClient);

    this.applicationDecisionProcessing = new ApplicationDecisionProcessingRestApi(this.apiClient);
    this.applicationDocumentConfiguration = new ApplicationDocumentConfigurationRestApi(this.apiClient);
    this.applicationDocuments = new ApplicationDocumentsRestApi(this.apiClient);
    this.applicationDocumentsDownloads = new ApplicationDocumentsDownloadsRestApi(this.apiClient);
    this.applicationDocumentsPreview = new ApplicationDocumentsPreviewRestApi(this.apiClient);
    this.applicationIntegrationProcessing = new ApplicationIntegrationProcessingRestApi(this.apiClient);
    this.applicationNotes = new ApplicationNotesRestApi(this.apiClient);
    this.applications = new ApplicationsRestApi(this.apiClient);
    this.applicationStatuses = new ApplicationStatusesRestApi(this.apiClient);
    this.borrowers = new BorrowersRestApi(this.apiClient);
    this.comments = new CommentsRestApi(this.apiClient);
    this.intermediaries = new IntermediariesRestApi(this.apiClient);
    this.layoutConfiguration = new LayoutConfigurationRestApi(this.apiClient);
    this.productCalculations = new ProductCalculationsRestApi(this.apiClient);
    this.products = new ProductsRestApi(this.apiClient);
    this.tasks = new TasksRestApi(this.apiClient);

    this.users = new UsersRestApi(this.apiClient);
    this.variables = new VariablesRestApi(this.apiClient);
    this.webhookEndpoints = new WebhookEndpointsRestApi(this.apiClient);

    this.docuSign = new DocuSignRestApi(this.apiClient);
  }
}

export default DigifiApi;
