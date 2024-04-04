import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import { useAppDispatch, useCurrentProjectId, useUser } from '@redux/hooks'
import { type IssueView, StageType } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import TicketCard from '@components/TicketCard/TicketCard'
import { setCurrentTicket } from '@redux/user'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import NoTicketMessage from '@components/NoTicketMessage/NoTicketMessage'
import { type OptionAttr } from '@components/Filter/Filter'
import ModalStop from '@components/ModalStopTracking/ModalStopTracking'

export interface TicketListProps {
  filters: OptionAttr[]
  searchedTicket: string
  isOutOfEstimation: boolean
  isProjectManager: boolean
  currentTicket: IssueView
}

const TicketList: React.FC<TicketListProps> = ({
  isProjectManager,
  searchedTicket,
  currentTicket
}: TicketListProps): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  const { showSnackBar } = useSnackBar()
  const currentProjectId = useCurrentProjectId()
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
  const user = useUser()
  const dispatch = useAppDispatch()

  const { data, error, isLoading } = useGetIssuesFilteredAndPaginated(
    isProjectManager,
    user.id,
    currentProjectId,
    filtersParams
  )

  const filteredIssues: IssueView[] | undefined = data?.filter(
    (issue: IssueView) =>
      issue.name.toLowerCase().includes(searchedTicket.toLowerCase())
  )

  type GroupedIssues = Record<string, IssueView[]>

  let groupedByStageName: GroupedIssues = {}

  if (filteredIssues && !error) {
    filteredIssues.sort(
      (a, b) =>
        Number(StageType[a.stage.type as unknown as keyof typeof StageType]) -
        Number(StageType[b.stage.type as unknown as keyof typeof StageType])
    )

    groupedByStageName = filteredIssues.reduce((acc: GroupedIssues, issue) => {
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
  const handleSelectedTicketId = (ticketId: string): void => {
    if (filteredIssues) {
      const selectedTicked = filteredIssues.find(
        (issue: IssueView) => issue.id === ticketId
      )
      if (selectedTicked && !currentTicket.isTracking) {
        dispatch(setCurrentTicket(selectedTicked))
      } else {
        setOpenModal(true)
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
      className={`w-full max-w-full md:max-w-[467px] h-[770px] bg-gray-500 ${filteredIssues ? 'overflow-y-auto' : 'overflow-y-hidden'} scrollbar-hide rounded-bl-xl`}
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
      {filteredIssues && filteredIssues.length !== 0 && !error ? (
        Object.entries(groupedByStageName).map(([key, issues]) => (
          <div key={key} className="text-white">
            <div className="w-full h-[51px] bg-white/5 items-center flex py-4 px-6 gap-2">
              <div
                className={`w-3 h-3 rounded-full ${stageColor(StageType[issues[0].stage.type as unknown as keyof typeof StageType])}`}
              />
              <Body2>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </Body2>
              <Body1>{issues?.length}</Body1>
            </div>
            <div className="flex flex-col items-center gap-4 py-4 px-6 md:py-6 w-full">
              {issues?.map((issue) => (
                <TicketCard
                  ticketId={issue.name}
                  name={issue.title}
                  priority={issue.priority}
                  status={
                    issue.isBlocked
                      ? 'blocked'
                      : issue.isTracking
                        ? 'tracking'
                        : null
                  }
                  isProjectManager={isProjectManager}
                  associatedUserProfile={issue.assignee || null}
                  selectedCard={currentTicket.id === issue.id}
                  storyPoints={issue.storyPoints}
                  handleClick={() => {
                    handleSelectedTicketId(issue.id)
                  }}
                  key={issue.id}
                />
              ))}
            </div>
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
      {openModal && (
        <ModalStop
          onStop={() => {}}
          onClose={() => {
            setOpenModal(false)
          }}
          show={openModal}
        />
      )}
    </div>
  )
}

export default TicketList
