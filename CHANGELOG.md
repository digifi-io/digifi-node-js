# Changelog

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
* Removed deprecated `WebhooksApi` class and related interfaces and enums.
* Removed deprecated interfaces and fields related to application details, borrower profiles, decision results, and portal settings.
