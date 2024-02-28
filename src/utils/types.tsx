export interface IconProps {
  fillColor?: string
  width?: string
  height?: string
}

export interface CognitoResponse extends Tokens {
  expires_in: number
  token_type: string
}

export interface Tokens {
  id_token: string
  access_token: string
  refresh_token: string
}

export interface Step {
  label: string
}

export interface Screen {
  width: number
  height: number
}

// Entities

export interface User {
  id: string
  cognitoId?: string
  profileImage?: string
  email: string
  name: string
  createdAt?: Date | string
  updatedAt?: Date
  deletedAt?: Date
  projectsRoleAssigned?: UserProjectRole[]
  emittedUserProjectRole?: UserProjectRole[]
  emittedBlockerStatusModification?: BlockerStatusModification[]
  authoredIssues?: Issue[]
  asignedIssues?: Issue[]
  emittedIssueChangeLogs?: IssueChangeLog[]
  emittedManualTimeModification?: ManualTimeModification[]
  OrganizationAdministrator?: OrganizationAdministrator[]
}

export interface Role {
  id: string
  name: string
  users: UserProjectRole[]
}

export interface Issue {
  id: string
  providerIssueId: string
  authorId?: string
  assigneeId?: string
  projectId: string
  stageId?: string
  name: string
  title: string
  description?: string
  priority: Priority
  storyPoints?: number
  createdAt: Date
  deletedAt?: Date
  project: Project
  author?: User
  assignee?: User
  labels: IssueLabel[]
  stage?: Stage
  timeTrackings: TimeTracking[]
  issueChangeLogs: IssueChangeLog[]
  customFields: IssueCustomFields[]
  blockerStatusModifications: BlockerStatusModification[]
  manualTimeModifications: ManualTimeModification[]
}

export interface IssueLabel {
  id: string
  labelId: string
  issueId: string
  label: Label
  issue: Issue
}

export interface IssueCustomFields {
  id: string
  issueId: string
  name: string
  value: string
  issue: Issue
}

export interface Stage {
  id: string
  name: string
  projectStages: ProjectStage[]
  issues: Issue[]
}

export interface Project {
  id: string
  name: string
  providerId: string
  organizationId: string
  image?: string
  createdAt: Date
  deletedAt?: Date
  organization: Organization
  usersRoles: UserProjectRole[]
  projectStages: ProjectStage[]
  issues: Issue[]
  labels: ProjectLabel[]
}

export interface LogWebhooks {
  id: string
  statusId: string
  sourceId: string
  providerEventId: string
  payload: any // Define a type for payload
  createdAt: Date
  status: WebhookOutcomeStatus
  source: WebhookSource
}

export interface WebhookOutcomeStatus {
  id: string
  name: string
  logsWebhooks: LogWebhooks[]
}

export interface WebhookSource {
  id: string
  name: string
  logsWebhooks: LogWebhooks[]
}

export interface TimeTracking {
  id: string
  issueId: string
  startTime: number
  endTime: number
  issue: Issue
}

export interface UserProjectRole {
  id: string
  userId?: string
  projectId?: string
  roleId?: string
  userEmitterId?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  project?: Project
  user: User
  userEmitter?: User
  role?: Role
}

export interface Label {
  id: string
  name: string
  issues: IssueLabel[]
  projectLabels: ProjectLabel[]
}

export interface BlockerStatusModification {
  id: string
  providerEventId: string
  userEmitterId: string
  issueId: string
  status: BlockType
  eventRegisteredAt?: Date
  createdAt: Date
  reason: string
  comment: string
  issue: Issue
  userEmitter: User
}

export interface ManualTimeModification {
  id: string
  userEmitterId: string
  issueId: string
  timeAmount: number
  modificationDate: Date
  reason: string
  issue: Issue
  userEmitter: User
}

export interface IssueChangeLog {
  id: string
  providerEventId: string
  userEmitterId: string
  issueId: string
  field: string
  from?: string
  to?: string
  eventRegisteredAt?: Date
  createdAt: Date
  userEmitter: User
  issue: Issue
}

export interface ProjectStage {
  id: string
  projectId: string
  stageId: string
  createdAt: Date
  deletedAt?: Date
  project: Project
  stage: Stage
}

export interface ProjectLabel {
  id: string
  projectId: string
  labelId: string
  createdAt: Date
  deletedAt?: Date
  project: Project
  label: Label
}

export enum BlockType {
  NO_STATUS,
  BLOCKED_BY,
  BLOCKING_TO
}

export enum Priority {
  NO_PRIORITY,
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
  HIGH_PRIORITY,
  URGENT
}

export interface Organization {
  id: string
  name: string
  projects: Project[]
  administrators: OrganizationAdministrator[]
  pendingProjects: PendingProjectAuthorization[]
}

export interface OrganizationAdministrator {
  id: string
  organizationId: string
  userId: string
  organization: Organization
  user: User
}

export interface PendingProjectAuthorization {
  id: string
  providerProjectId: string
  token: string
  integratorId: string
  issueProviderId: string
  organizationId: string
  issueProvider: IssueProvider
  organization: Organization
  emails: MemberEmail[]
}

export interface IssueProvider {
  id: string
  name: string
  PendingProjectAuthorization: PendingProjectAuthorization[]
}

export interface MemberEmail {
  id: string
  email: string
  pendingProjectAuthorizationId: string
  pendingProjectAuthorization: PendingProjectAuthorization
}
