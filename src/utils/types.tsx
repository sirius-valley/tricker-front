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

export interface User {
  id: string
  username: string
  profileImage?: string | null
  createdAt?: Date
  projectsRoleAssigned?: UserProjectRole[]
  emittedUserProjectRole?: UserProjectRole[]
  emittedBlockerStatusModif?: BlockerStatusModification[]
  authoredIssues?: Issue[]
  asignedIssues?: Issue[]
  emittedIssueChangeLogs?: IssueChangeLog[]
  emittedManualTimeModif?: ManualTimeModification[]
}

export interface PendingUser {
  id: string
  email: string
  projectId: string
  status: AuthorizationStatus
  createdAt: Date
  statusUpdatedAt: Date
  project: Project
}

export interface Role {
  id: string
  name: string
  users: UserProjectRole[]
}

export interface Issue {
  id: string
  authorId: string
  assigneeId: string
  projectId: string
  stageId: string
  issueLabelId: string
  name: string
  title: string
  description: string
  priority: Priority
  storyPoints: number
  createdAt: Date
  deletedAt?: Date | null
  project: Project
  author: User
  assignee: User
  issueLabel: IssueLabel
  stage: Stage
  timeTrackings: TimeTracking[]
  issueChangeLogs: IssueChangeLog[]
  customFields: IssueCustomFields[]
  blockerStatusModifications: BlockerStatusModification[]
  manualTimeModifications: ManualTimeModification[]
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
  url: string
  createdAt: Date
  deletedAt?: Date | null
  usersRoles: UserProjectRole[]
  pendingUsers: PendingUser[]
  projectStages: ProjectStage[]
  issues: Issue[]
}

export interface LogWebhooks {
  id: string
  statusId: string
  sourceId: string
  // payload: Record<string, any> // JSON type //linter does not accept type 'any'
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
  id?: string
  userId?: string
  projectId?: string
  roleId?: string
  userEmitterId?: string
  createdAt?: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
  project?: Project
  user: User
  userEmitter?: User
  role?: Role
}

export interface IssueLabel {
  id: string
  name: string
  issues: Issue[]
}

export interface BlockerStatusModification {
  id: string
  userEmitterId: string
  issueId: string
  status: BlockType
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
  userEmitterId: string
  issueId: string
  field: string
  from: string
  to: string
  createdAt: Date
  userEmitter: User
  issue: Issue
}

export interface ProjectStage {
  id: string
  projectId: string
  stageId: string
  createdAt: Date
  deletedAt?: Date | null
  project: Project
  stage: Stage
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

export enum AuthorizationStatus {
  ACCEPTED,
  PENDING
}
