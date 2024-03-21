import React, { useState } from 'react'
import { StageType, type IssueView, Priority } from '@utils/types'
import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import { useCurrentProjectId, useCurrentTicketId, useUser } from '@redux/hooks'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
// import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
import { Pill } from '@components/Pill/Pill'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import config from '../../../tailwind.config'
import NotificationBadge from '@components/NotificationBadge/NotificationBadge'
import NoTicketMessage from '@components/NoTicketMessage/NoTicketMessage'
import { type TicketListProps } from '@components/TicketList/TicketList'

const colors = config.theme.extend.colors

const TicketListSmallDisplay: React.FC<TicketListProps> = (): JSX.Element => {
  const selectedProjectId = useCurrentProjectId()
  const filtersParams = {}
  // if (filters.length !== 0) {
  //   filtersParams = {}
  // filtersParams = {

  //   stageIds: filters.stageIds,
  //   priorities: filters.priorities,
  //   isOutOfEstimation: filters?.isOutOfEstimation,
  //   cursor
  // }
  // } // Replace with filter props and parse it to OptionalIssueFilters
  const [selectedTicket, setSelectedTicket] =
    useState<string>(useCurrentTicketId())
  const user = useUser()
  const { data, error, isLoading } = useGetIssuesFilteredAndPaginated(
    user.id,
    selectedProjectId,
    filtersParams
  )

  type GroupedIssues = Record<string, IssueView[]>

  let groupedByStageName: GroupedIssues = {}

  if (data && !error) {
    data.sort(
      (a, b) =>
        Number(StageType[a.stage.type as unknown as keyof typeof StageType]) -
        Number(StageType[b.stage.type as unknown as keyof typeof StageType])
    )

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

  return (
    <div
      className={`w-[467px] h-full bg-gray-500 ${data ? 'overflow-y-scroll' : 'overflow-y-hidden'} scrollbar-hide rounded-bl-xl`}
    >
      {error && (
        <div className="w-full h-full flex items-center justify-center">
          <NotificationBadge variant="error" className="max-w-fit">
            Error fetching the tickets, please try again later
          </NotificationBadge>
        </div>
      )}
      {isLoading && (
        <div className="p-1">
          <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
            {Array.from({ length: 15 }, (_, index) => (
              <Skeleton key={index} height={48} containerClassName="h-[14px]" />
            ))}
          </SkeletonTheme>
        </div>
      )}
      {data && data.length === 0 && !isLoading && !error && (
        <div className="w-full h-full flex justify-center items-center">
          <NoTicketMessage />
        </div>
      )}
      {data?.length !== 0 &&
        Object.entries(groupedByStageName).map(([key, issues]) => {
          return issues?.length !== 0 ? (
            <div key={key} className="text-white">
              <div className="h-[51px] bg-white/5 items-center flex py-4 px-6 gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${stageColor(StageType[issues[0].stage.type as unknown as keyof typeof StageType])}`}
                ></div>
                <Body2>
                  {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                </Body2>
                <Body1>{issues?.length}</Body1>
              </div>
              {issues?.map((issue) => (
                <div
                  key={issue.id}
                  className={`h-[51px] border-l-[2px]  items-center flex py-4 px-6 gap-2 cursor-pointer ${selectedTicket === issue.id ? 'bg-primary-400/5 border-primary-400 text-primary-400' : 'bg-gray-500 border-gray-500'} `}
                  onClick={() => {
                    setSelectedTicket(issue.id)
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
                        selectedTicket === issue.id
                          ? colors.primary[400]
                          : 'white'
                      }
                    />
                    {issue.storyPoints && (
                      <StoryPointsIcon
                        points={issue.storyPoints}
                        fillColor={
                          selectedTicket === issue.id
                            ? colors.primary[400]
                            : 'white'
                        }
                      />
                    )}
                  </div>
                  <Body1 className="font-semibold min-w-fit">
                    {issue.name}
                  </Body1>
                  <Body1 className="truncate text-ellipsis ">
                    {issue.title}
                  </Body1>
                  {issue.blocked === true && (
                    <Pill variant="blocked">Blocked</Pill>
                  )}
                  {issue.tracking === true && (
                    <Pill variant="tracking">Tracking time</Pill>
                  )}
                </div>
              ))}
            </div>
          ) : null
        })}
    </div>
  )
}

export default TicketListSmallDisplay
