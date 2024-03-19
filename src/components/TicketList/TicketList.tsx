import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import {
  useAppDispatch,
  useCurrentProjectId,
  useCurrentTicketId,
  useUser
} from '@redux/hooks'
import { type IssueView, StageType, type UserProjectRole } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import TicketCard from '@components/TicketCard/TicketCard'
import { setCurrentTicketId } from '@redux/user'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'

const TicketList = (): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const currentProjectId = useCurrentProjectId()
  const filters = {} // Replace with redux
  const user = useUser()
  const dispatch = useAppDispatch()
  const currentProject = user.projectsRoleAssigned.find(
    (project: UserProjectRole) => project.projectId === currentProjectId
  )

  const [selectedTicket, setSelectedTicket] =
    useState<string>(useCurrentTicketId())
  const isProjectManager = currentProject?.role?.name === 'Project Manager'

  const { data, error, isLoading } = useGetIssuesFilteredAndPaginated(
    user.id,
    currentProjectId,
    filters
  )
  type GroupedIssues = Record<string, IssueView[]>

  let groupedByStageName: GroupedIssues = {}

  if (data && !error) {
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

  const handleSelectedTicket = (ticketId: string): void => {
    setSelectedTicket(ticketId)
    dispatch(setCurrentTicketId(ticketId))
  }

  if (error) {
    showSnackBar('Error fetching the tickets, please try again later', 'error')
  }
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
      {Object.entries(groupedByStageName).map(([key, issues]) => {
        return issues?.length !== 0 && !error ? (
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
                    handleSelectedTicket(issue.id)
                  }}
                  key={issue.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>No tickets found</div>
        ) // change by NoTicketMessage component
      })}
    </div>
  )
}

export default TicketList
