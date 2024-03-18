import React, { useState } from 'react'
import { Priority, StageType } from '@utils/types'
import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import { useUser } from '@redux/hooks'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
// import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
import { Pill } from '@components/Pill/Pill'
import config from '../../../tailwind.config'
const colors = config.theme.extend.colors

const TicketListSmallDisplay: React.FC = (): JSX.Element => {
  const selectedProjectId = '123' // later to be replaced with redux
  const filters = {
    priorities: [
      Priority.LOW_PRIORITY,
      Priority.MEDIUM_PRIORITY,
      Priority.HIGH_PRIORITY
    ]
  } // later to be replaced with redux
  const [selectedTicket, setSelectedTicket] = useState('') // later to be replaced with redux

  const user = useUser()
  const { data, error, isLoading } = useGetIssuesFilteredAndPaginated(
    user.id,
    selectedProjectId,
    filters
  )

  const issues = {
    backlog: data?.filter((issue) => issue.stage.type === StageType.BACKLOG),
    unstarted: data?.filter(
      (issue) => issue.stage.type === StageType.UNSTARTED
    ),
    started: data?.filter((issue) => issue.stage.type === StageType.STARTED),
    completed: data?.filter(
      (issue) => issue.stage.type === StageType.COMPLETED
    ),
    canceled: data?.filter((issue) => issue.stage.type === StageType.CANCELED),
    other: data?.filter((issue) => issue.stage.type === StageType.OTHER)
  }

  const stageColor = (stageType: string): string => {
    switch (stageType) {
      case 'backlog':
        return 'bg-gray-300/60'
      case 'unstarted':
        return 'bg-white'
      case 'started':
        return 'bg-secondary-400'
      case 'completed':
        return 'bg-primary-400'
      case 'canceled':
        return 'bg-red-400'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div className="w-[467px] h-[770px] bg-gray-500 overflow-y-scroll">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {Object.entries(issues).map(([stageType, issues]) => {
        return issues?.length !== 0 ? (
          <div key={stageType} className="text-white">
            <div className="h-[51px] bg-white/5 items-center flex py-4 px-6 gap-2">
              <div
                className={`w-3 h-3 rounded-full ${stageColor(stageType)}`}
              ></div>
              <Body2>
                {stageType.charAt(0).toUpperCase() +
                  stageType.slice(1).toLowerCase()}
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
                    variant={issue.priority}
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
                <Body1 className="font-semibold min-w-fit">{issue.title}</Body1>
                <Body1 className="truncate text-ellipsis ">{issue.name}</Body1>
                {issue.blocked === true && (
                  <Pill variant="blocked">Blocked</Pill>
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
