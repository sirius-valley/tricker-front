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

export interface DropdownOption {
  id: string
  title: string
  image: string
}

export interface MyProjectsOption {
  id: string
  title: string
  image: string
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
  projectsRoleAssigned: UserProjectRole[]
  emittedUserProjectRole?: UserProjectRole[]
  // emittedBlockerStatusModification?: BlockerStatusModification[]
  authoredIssues?: Issue[]
  asignedIssues?: Issue[]
  emittedIssueChangeLogs?: IssueChangeLog[]
  emittedManualTimeModification?: ManualTimeModification[]
  // OrganizationAdministrator?: OrganizationAdministrator[]
}

export interface Role {
  id: string
  name: string
  users: UserProjectRole[]
}

export interface UserIssue {
  id: string
  name: string | null
  profileUrl: string | null
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

export interface Event {
  type: EventType
  user: UserIssue
}

export enum EventType {
  CREATED,
  ASSIGNED,
  BLOCKED,
  UNBLOCKED,
  TRACKING,
  UNTRACKING,
  CUSTOM_FIELD
}

export interface IssueDetail {
  id: string
  asignee: UserIssue | null
  name: string
  title: string
  description: string
  priority: Priority
  storyPoints: number | null
  labels: Label[]
  chronology: Event[]
}

export interface IssueView {
  id: string
  assignee: UserIssue | null
  stage: StageExtended
  name: string
  title: string
  description: string | null
  priority: Priority
  storyPoints: number | null
  labels: Label[]
  isBlocked: boolean
  isTracking: boolean
}

export interface IssueChronologyEventDTO {
  id: string
  message: string
  comment: string | null
  isBlocker: boolean
  date: string | Date
}

export interface IssueChronologyEvent {
  id: string
  message: string
  comment: string | null
  isBlocker: boolean
  date: Date
}

export interface Stage {
  id: string
  name: string
}
export interface StageExtended extends Stage {
  type: StageType
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

export interface Project {
  id: string
  name: string
  providerId: string
  organizationId: string
  image?: string
  createdAt: Date | string
  deletedAt?: Date
  organization: Organization
  usersRoles: UserProjectRole[]
  projectStages: ProjectStage[]
  issues: Issue[]
  labels: ProjectLabel[]
}

export interface ProjectPreIntegrated {
  providerProjectId: string
  name: string
  image: string | null
}

export interface MemberPreIntegrated {
  providerId: string
  email: string
  name: string
  profileImage?: string
}

export interface AuthorizationRequest {
  apiToken: string
  projectId: string
  integratorId: string
  members: AuthorizedMemberDTO[]
  organizationName: string
  issueProviderName: string
}

export interface AuthorizedMemberDTO {
  id: string
  email: string
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
  projectId: string
  roleId?: string
  userEmitterId?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  project: Project
  user: User
  userEmitter?: User
  role?: Role
}

export interface Label {
  id: string
  name: string
  issues?: IssueLabel[]
  projectLabels?: ProjectLabel[]
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

export enum StageType {
  BACKLOG,
  UNSTARTED,
  STARTED,
  COMPLETED,
  CANCELED,
  OTHER
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

export interface OptionalIssueFilters {
  stageIds?: string[]
  priorities?: Priority[]
  assigneeIds?: string[]
  isOutOfEstimation?: boolean
  cursor?: string
}

export interface ModifyTimeData {
  timeAmount: number
  reason: string
  date: string
}
