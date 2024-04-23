import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import {
  useAppDispatch,
  useCurrentProjectId,
  useCurrentTrackingTicket,
  useHasToRefetchList,
  useUser
} from '@redux/hooks'
import {
  type IssueView,
  type OptionalIssueFilters,
  Priority
} from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import Body2 from '@utils/typography/body2/body2'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import TicketCard from '@components/TicketCard/TicketCard'
import {
  setCurrentTicket,
  setCurrentTrackingTicket,
  setHasToRefetchList,
  setStopTracking
} from '@redux/user'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import NoTicketMessage from '@components/NoTicketMessage/NoTicketMessage'
import ModalStop from '@components/ModalStopTracking/ModalStopTracking'
import { Pill } from '@components/Pill/Pill'
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import config from '../../../tailwind.config'
import useScreenSize from '@hooks/useScreenSize'

export interface TicketListProps {
  filters: OptionalIssueFilters
  searchedTicket: string
  isOutOfEstimation: boolean
  isProjectManager: boolean
  currentTicket: IssueView
  variant: 'list' | 'grid'
}

const colors = config.theme.extend.colors

const TicketList: React.FC<TicketListProps> = ({
  isProjectManager,
  searchedTicket,
  currentTicket,
  variant = 'list',
  filters,
  isOutOfEstimation
}: TicketListProps): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  const { showSnackBar } = useSnackBar()
  const screen = useScreenSize()
  const currentProjectId = useCurrentProjectId()
  const [enabled, setEnabled] = useState(false)
  const currentTrackingTicket = useCurrentTrackingTicket()
  const hasToRefetchList: boolean = useHasToRefetchList()

  const user = useUser()
  const dispatch = useAppDispatch()

  const isMobile = screen.width < 768

  const { data, error, isLoading, refetch } = useGetIssuesFilteredAndPaginated(
    isProjectManager,
    user.id,
    currentProjectId,
    { ...filters, isOutOfEstimation },
    enabled
  )

  useEffect(() => {
    if (data) {
      const trackingTicket = data.find((ticket) => ticket.isTracking)
      const selectedTicket = data.find(
        (ticket) => ticket.id === currentTicket.id
      )
      if (trackingTicket) {
        if (!isMobile) dispatch(setCurrentTicket(trackingTicket))
        dispatch(setCurrentTrackingTicket(trackingTicket))
      } else {
        if (
          currentTicket.assignee?.id !== user.id ||
          (data.length > 0 && currentTicket.id === '')
        ) {
          if (!isMobile) {
            dispatch(setCurrentTicket(data[0]))
          }
        } else if (selectedTicket) dispatch(setCurrentTicket(selectedTicket))
      }
    }
  }, [data, isMobile])

  useEffect(() => {
    if (hasToRefetchList) {
      refetch()
      dispatch(setHasToRefetchList(false))
    }
  }, [hasToRefetchList])

  useEffect(() => {
    if (currentProjectId !== '') {
      setEnabled(true)
      refetch()
    }
  }, [currentProjectId])

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
      if (
        (selectedTicked && currentTrackingTicket.id === '') ||
        currentTrackingTicket.id === selectedTicked?.id
      ) {
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
    <>
      {openModal && (
        <ModalStop
          onStop={() => {
            dispatch(setStopTracking(true))
            setOpenModal(false)
          }}
          onClose={() => {
            setOpenModal(false)
          }}
          show={openModal}
        />
      )}
      {variant === 'list' ? (
        <div
          className={`w-full max-w-[467px] h-full bg-gray-500 ${filteredIssues ? 'overflow-y-scroll' : 'overflow-y-hidden'} scrollbar-hide rounded-bl-xl`}
        >
          {isLoading && (
            <div className="p-1">
              <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
                {Array.from({ length: 15 }, (_, index) => (
                  <Skeleton
                    key={index}
                    height={48}
                    containerClassName="h-[14px]"
                  />
                ))}
              </SkeletonTheme>
            </div>
          )}
          {filteredIssues && filteredIssues.length !== 0 && !error ? (
            Object.entries(groupedByStageName).map(([key, issues]) => (
              <div key={key} className="text-white items-center w-full">
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
                    <div className="flex gap-1 min-h-[23px] items-center">
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
                    <Body1 className="font-semibold min-w-fit">
                      {issue.name}
                    </Body1>
                    <Body1 className="truncate text-ellipsis ">
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
      ) : (
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
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: issues[0].stage.color }}
                  />
                  <Body2>{issues[0].stage.name}</Body2>
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
        </div>
      )}
    </>
  )
}

export default TicketList
