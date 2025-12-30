# Changelog

## 6.12.0 - 2025-12-30
* Introduced `Communications API`.
* Added `searchEngineVisibility` field to the `IBaseStandardPortalConfig` interface.

## 6.11.0 - 2025-09-15
* `taskId` field was deprecated in the `FindApplicationDocumentsParams` interface.
* Added `taskIds` (optional `string[]`) to the `FindApplicationDocumentsParams` interface.
* `taskId` field was deprecated in the `ApplicationDocument` interface.
* Added `taskIds` (optional `string[]`) to the `ApplicationDocument` interface.
* Added new `tasksLink` method to the `ApplicationDocumentsRestApi` interface.
* Added new `tasksUnlink` method to the `ApplicationDocumentsRestApi` interface.

## 6.10.0 - 2025-07-07
* Introduced `Labels API`.

## 6.9.0 - 2025-06-09
* Added `permissionGroupsToViewApplication` to the `ApplicationStatus` interface.

## 6.8.0 - 2025-04-28
* Added `coBorrowerTypes` (required `BorrowerType`) to the `Product` interface.
* Added `coBorrowerTypes` (required `BorrowerType`) to the `Application.product` interface.

## 6.7.0 - 2025-02-27
* `getIntegrationSettings` method of `DocuSignApi` api were marked as deprecated.
* Added new `getConnectionStatus` method to the `DocuSignApi` interface.
* Added new `createEmbeddedSigningData` method to the `DocuSignApi` interface.

## 6.6.0 - 2025-02-03
* Updated signature of `acceptInvite` method in the `InvitesApi` api.
* `phones` param of the `BaseAccountInfo` type and `BaseAccountPhone` interface were marked as deprecated.
* Added `phone` (optional `string`) to the `BaseAccountPhone` interface.
* Added `isPhoneVerified` (required `boolean`) to the `BaseAccountPhone` interface.
* Added `applicationId` (optional `string`), `recipientType` (optional `ESignTemplateRecipientEntityType`) to the `ListEnvelopesParams` interface.
* Added `fullName` (optional `string`) to `IntermediaryAccountInfo`.
* Added a new endpoint to `IntermediaryAccountsRestApi` - `updateFullName`.

## 6.5.0 - 2025-01-08
* `BrandingLanguage` enum was added to branding api.
* `language` field was added to the `Branding` interface.
* Optional `data` (`object` type) field was added to `ApiRequestError` interface.

## 6.4.0 - 2024-12-19
* `ApplicationDocumentConfigurationApi` api and related interfaces were deprecated.
* `LayoutConfigurationApi` api and related interfaces were deprecated.
* `formulaRequiredVariables` field was deprecated in the `FormulaCondition` interface.
* `formulaCompilation` field was added to the `FormulaCondition` interface.
* `formulaCondition` field was deprecated in the `ConditionalFormattingRule` interface.
* `formula` field was added `ConditionalFormattingRule` interface.
* `formulaInputsMetadata` field was added to the `ConditionalFormattingRule` interface.

## 6.3.2 - 2024-11-27
* Removed customFields property from the `DocuSignEnvelope` interface.

## 6.3.1 - 2024-11-25
* Introduced `DocuSign API`.
* Removed borrowerType property from the `BorrowerStandardPortalGeneralSettings` interface and `StandardBorrowerPortalConfig` interface.

## 6.2.0 - 2024-10-17
* Added new `uploadFiles` method to the `IntegrationProcessingApi` interface.
* Introduced interfaces to operate with files in IntegrationProcessingApi and DecisionProcessingApi.
* Added `files` (optional `ProcessDecisionFileParams[]`) to the `ProcessDecisionsParams` interface.
* Added `files` (optional `ProcessIntegrationFileParams[]`) to the `ProcessIntegrationParams` interface.

## 6.0.0 - 2024-06-25
* Added `DigifiApi` class that can be used to access all the APIs.
* Renamed `BorrowerStandardPortalLegalDocumentsApi` was to `BorrowerStandardPortalLegalConsentsRestApi`.
* Renamed all `*ApiService` classes to `*RestApi`.
* Renamed all `*Api` classes to `*RestApi`.
* Introduced interfaces to access API services.
* `AccountsRestApi`, `EmailVerificationRestApi`, `InvitesRestApi`, `PhoneVerificationRestApi`,
  `ResetPasswordRestApi`, `SessionsRestApi` classes became abstract.
* Introduced following classes: `BorrowerAccountsRestApi`, `BorrowerEmailVerificationRestApi`,
  `BorrowerInvitesRestApi`, `BorrowerPhoneVerificationRestApi`, `BorrowerResetPasswordRestApi`,
  `BorrowerSessionsRestApi`, `IntermediaryAccountsRestApi`, `IntermediaryEmailVerificationRestApi`,
  `IntermediaryInvitesRestApi`,`IntermediaryPhoneVerificationRestApi`, `IntermediaryResetPasswordRestApi`,
  `IntermediarySessionsRestApi`.

## 5.1.0 - 2024-04-03
* Added new `runAutomation` method to the `ApplicationsApi` interface.
* Added `taskId` (optional `string`) to the `CreateManyApplicationDocumentParams` interface.

## 5.0.0 - 2024-02-26
* Added support for the new API Version `2024-02-26`.
* `ApiClient` now requires the `apiVersion` parameter to be passed via `options`.
* Removed the `ApiVersion` enum.
* Removed the `ApiVersionError`.
* Added the `TaskExternalAssignee` interface.
* Updated `TaskSortField` enum values:
  * Removed `Description` value (use `Title` instead).
  * Removed `DueDate` value (use `DueDateAndTime` instead).
  * Added `CreatedAt` value (to sort tasks by creation date).
* Updated `TaskStatus` enum values:
  * Added `In Progress`, `Cancelled`, and `Failed` values.
* Removed the `TaskAssigneeType` enum (use `ExternalTaskAssigneeType` enum instead).
* Removed the `TaskAssignedBorrower` interface (use `BorrowerExternalAssignee` interface instead).
* Removed the `TaskAssignedIntermediary` interface (use `IntermediaryExternalAssignee` interface instead).
* Removed the `TaskApplication` interface.
* Removed the `TaskAssignee` interface (use `TaskExternalAssignee` interface instead).
* Updated the `CreateTaskParams` and `UpdateTaskParams` interfaces with the following changes:
  * Removed `description` and `dueDate` fields (use `title` and `dueDateAndTime` instead).
  * Removed `blockedStatusesIds` field (use `blockedApplicationStatusIds` instead).
  * Removed `assignee` field (use `externalAssignee` and `assignedTeamMemberIds` instead).
  * Renamed `shouldSendAssignmentEmail` to `sendExternalAssignmentEmail`.
  * Added the following fields:
    * `title` (required `string`) for the task title.
    * `internalInstructions` (optional `string`) for internal guidance.
    * `externalInstructions` (optional `string`) for external guidance.
    * `dueDateAndTime` (optional `Date`) for the task's due date and time.
    * `blockedApplicationStatusIds` (optional `string[]` or `null`) for specifying statuses that block the task.
    * `assignedTeamMemberIds` (optional `string[]`) for IDs of team members assigned to the task.
    * `labelIds` (optional `string[]`) for assigned task label IDs.
    * `externalAssignee` (optional `UpdateExternalAssigneeParams` or null) for specifying the external assignee parameters.
* Updated the `Task` interface accordingly.
* Removed the `FindTasksParams` interface (use `SearchTasksParams` interface instead).
* Renamed `TasksApi` class to `TasksApiService` and introduced the `TasksApi` interface with new methods.
* Updated the `ApplicationsApi`, `BorrowersApi`, and `IntermediariesApi` classes and interfaces accordingly.
* Added new `findByDisplayId` method to the `ApplicationsApi` interface.
* Removed deprecated `WebhooksApi` class and related interfaces and enums.
* Removed deprecated interfaces and fields related to application details, borrower profiles, decision results, and portal settings.
