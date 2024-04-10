import React, { useEffect } from 'react'
import { type IssueView, Priority } from '@utils/types'
import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import { useAppDispatch, useCurrentProjectId, useUser } from '@redux/hooks'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { Pill } from '@components/Pill/Pill'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import config from '../../../tailwind.config'
import { type TicketListProps } from '@components/TicketList/TicketList'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { setCurrentTicket } from '@redux/user'
import NoTicketMessage from '@components/NoTicketMessage/NoTicketMessage'

const colors = config.theme.extend.colors

const TicketListSmallDisplay: React.FC<TicketListProps> = ({
  isProjectManager,
  searchedTicket,
  currentTicket,
  filters,
  isOutOfEstimation
}: TicketListProps): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const selectedProjectId = useCurrentProjectId()

  const dispatch = useAppDispatch()
  const user = useUser()
  const { data, error, isLoading } = useGetIssuesFilteredAndPaginated(
    isProjectManager,
    user.id,
    selectedProjectId,
    { ...filters, isOutOfEstimation }
  )

  const filteredIssues: IssueView[] | undefined = data?.filter(
    (issue: IssueView) =>
      issue.name.toLowerCase().includes(searchedTicket.toLowerCase())
  )

  type GroupedIssues = Record<string, IssueView[]>

  let groupedByStageName: GroupedIssues = {}

  if (filteredIssues && !error) {
    groupedByStageName = filteredIssues.reduce((acc: GroupedIssues, issue) => {
      if (acc[issue.stage.name] === undefined) {
        acc[issue.stage.name] = []
      }
      acc[issue.stage.name].push(issue)
      return acc
    }, {})
  }

  const handleSelectedTicketId = (ticketId: string): void => {
    if (filteredIssues) {
      const selectedTicked = filteredIssues.find(
        (issue: IssueView) => issue.id === ticketId
      )
      if (selectedTicked) {
        dispatch(setCurrentTicket(selectedTicked))
      }
    }
  }

  useEffect(() => {
    if (error) {
      showSnackBar(
        'Error fetching the tickets, please try again later',
        'error'
      )
    }
  }, [error])

  return (
    <div
      className={`w-full max-w-[467px] h-full bg-gray-500 ${filteredIssues ? 'overflow-y-scroll' : 'overflow-y-hidden'} scrollbar-hide rounded-bl-xl`}
    >
      {isLoading && (
        <div className="p-1">
          <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
            {Array.from({ length: 15 }, (_, index) => (
              <Skeleton key={index} height={48} containerClassName="h-[14px]" />
            ))}
          </SkeletonTheme>
        </div>
      )}
      {filteredIssues && filteredIssues.length !== 0 && !error ? (
        Object.entries(groupedByStageName).map(([key, issues]) => (
          <div key={key} className="text-white">
            <div className="h-[51px] w-full bg-white/5 items-center flex py-4 px-6 gap-2">
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: issues[0].stage.color }}
              />
              <Body2>{issues[0].stage.name}</Body2>
              <Body1>{issues?.length}</Body1>
            </div>
            {issues?.map((issue) => (
              <div
                key={issue.id}
                className={`h-[51px] border-l-[2px] w-full items-center flex py-4 px-6 gap-2 cursor-pointer ${currentTicket.id === issue.id ? 'bg-primary-400/5 border-primary-400 text-primary-400' : 'bg-gray-500 border-gray-500'} `}
                onClick={() => {
                  handleSelectedTicketId(issue.id)
                }}
              >
                <div className="flex gap-1">
                  <PriorityIcon
                    variant={
                      Priority[
                        issue.priority as unknown as keyof typeof Priority
                      ]
                    }
                    fillColor={
                      currentTicket.id === issue.id
                        ? colors.primary[400]
                        : 'white'
                    }
                  />
                  {issue.storyPoints && (
                    <StoryPointsIcon
                      points={issue.storyPoints}
                      fillColor={
                        currentTicket.id === issue.id
                          ? colors.primary[400]
                          : 'white'
                      }
                    />
                  )}
                </div>
                <Body1 className="font-semibold min-w-fit">{issue.name}</Body1>
                <Body1 className="w-[20vw] truncate text-ellipsis ">
                  {issue.title}
                </Body1>
                {issue.isBlocked && <Pill variant="blocked">Blocked</Pill>}
                {issue.isTracking && (
                  <Pill variant="tracking">Tracking time</Pill>
                )}
              </div>
            ))}
          </div>
        ))
      ) : !data ? (
        <NoTicketMessage />
      ) : (
        <NoTicketMessage
          title="No tickets found"
          subtitle="It seems there are no tickets that match your search"
        />
      )}
    </div>
  )
}

export default TicketListSmallDisplay
