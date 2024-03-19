import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import { useCurrentProjectId, useUser } from '@redux/hooks'
import { type IssueView, StageType, type UserProjectRole } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import TicketCard from '@components/TicketCard/TicketCard'

const TicketList = (): JSX.Element => {
  const currentProjectId = useCurrentProjectId()
  const filters = {} // later to be replaced with redux
  const user = useUser()
  const currentProject = user.projectsRoleAssigned.find(
    (project: UserProjectRole) => project.projectId === currentProjectId
  )

  const [selectedTicket, setSelectedTicket] = useState<string>('') // later to be replaced with redux
  const isProjectManager = currentProject?.role?.name === 'Project Manager'

  const { data, error, isLoading } = useGetIssuesFilteredAndPaginated(
    user.id,
    currentProjectId,
    filters
  )
  type GroupedIssues = Record<string, IssueView[]>

  let groupedByStageName: GroupedIssues = {}

  if (data) {
    data?.sort((a, b) => a.stage.type - b.stage.type)

    groupedByStageName = data.reduce((acc: GroupedIssues, issue) => {
      if (acc[issue.stage.name] === undefined) {
        acc[issue.stage.name] = []
      }
      acc[issue.stage.name].push(issue)
      return acc
    }, {})
  }

  const stageColor = (stageType: StageType): string => {
    switch (stageType) {
      case StageType.BACKLOG:
        return 'bg-gray-300/60'
      case StageType.UNSTARTED:
        return 'bg-white'
      case StageType.STARTED:
        return 'bg-secondary-400'
      case StageType.COMPLETED:
        return 'bg-primary-400'
      case StageType.CANCELED:
        return 'bg-red-400'
      default:
        return 'bg-gray-300'
    }
  }
  // TODO: agregar snackbar cuando hay error
  return (
    <div
      className={`w-[467px] h-[770px] bg-gray-500 ${data ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
    >
      {isLoading && (
        <div className="p-6 w-full">
          <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
            {Array.from({ length: 15 }, (_, index) => (
              <Skeleton
                key={index}
                height={114}
                containerClassName="flex p-2"
              />
            ))}
          </SkeletonTheme>
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      {Object.entries(groupedByStageName).map(([key, issues]) => {
        return issues?.length !== 0 ? (
          <div key={key} className="text-white">
            <div className="h-[51px] bg-white/5 items-center flex py-4 px-6 gap-2">
              <div
                className={`w-3 h-3 rounded-full ${stageColor(issues[0].stage.type)}`}
              ></div>
              <Body2>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </Body2>
              <Body1>{issues?.length}</Body1>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 w-full ">
              {issues?.map((issue) => (
                <TicketCard
                  ticketId={issue.title}
                  name={issue.name}
                  priority={issue.priority}
                  status={
                    issue.blocked === true
                      ? 'blocked'
                      : issue.tracking === true
                        ? 'tracking'
                        : null
                  }
                  isProjectManager={isProjectManager}
                  associatedUserProfile={issue.assignee?.profileUrl || ''}
                  selectedCard={selectedTicket === issue.id}
                  storyPoints={issue.storyPoints}
                  handleClick={() => {
                    setSelectedTicket(issue.id)
                  }}
                  key={issue.id}
                />
              ))}
            </div>
          </div>
        ) : null
      })}
    </div>
  )
}

export default TicketList
