import Chronology from '@components/Chronology/Chronology'
import Icon from '@components/Icon/Icon'
import { Modal } from '@components/Modal/Modal'
import TicketDisplay from '@components/TicketDisplay/TicketDisplay'
import TicketListWrapper from '@components/TicketListWrapper/TicketListWrapper'
import useScreenSize from '@hooks/useScreenSize'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import {
  useAppDispatch,
  useCurrentTicket,
  useUser,
  useUserRole
} from '@redux/hooks'
import { setCurrentTicket, initialState } from '@redux/user'
import {
  type IssueChronologyEvent,
  type IssueChronologyEventDTO
} from '@utils/types'
import { useNavigate } from 'react-router-dom'
import Timer from '@components/Timer/Timer'
import { useGetIssueById } from '@data-provider/query'
import { useEffect, useState } from 'react'

export interface TicketsSectionProps {
  myTeam?: boolean
}

const TicketsSection: React.FC<TicketsSectionProps> = ({
  myTeam = false
}: TicketsSectionProps): JSX.Element => {
  const user = useUser()
  const userRole = useUserRole()
  const screen = useScreenSize()
  const currentTicket = useCurrentTicket()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  if (user.id === '') navigate('/login')
  const [chronology, setChronology] = useState<IssueChronologyEvent[]>([])
  const [enabled, setEnabled] = useState<boolean>(false)
  const { showSnackBar } = useSnackBar()

  const deselectCurrentTicket = (): void => {
    dispatch(setCurrentTicket(initialState.currentTicket))
  }

  const { data, isLoading, error, refetch } = useGetIssueById(
    currentTicket.id,
    enabled
  )

  useEffect(() => {
    if (currentTicket.id !== '') {
      setEnabled(true)
      refetch()
    }
  }, [currentTicket.id])

  useEffect(() => {
    if (error) {
      showSnackBar('Error loading the ticket', 'error')
    }
  }, [error])

  useEffect(() => {
    if (data) {
      const dataEvents: IssueChronologyEventDTO[] = [...data.chronology]

      setChronology(
        dataEvents.map((event) => {
          if (typeof event.date === 'string') {
            event.date = new Date(event.date)
          }
          return event as IssueChronologyEvent
        })
      )
      chronology.sort((a, b) => {
        return a.date.getTime() - b.date.getTime()
      })
    }
  }, [data])

  return screen.width >= 768 ? (
    <div className="h-full w-full flex items-center">
      <div className="max-w-[467px] w-full h-full">
        <TicketListWrapper
          currentTicket={currentTicket}
          userRole={
            myTeam && userRole === 'Project Manager' ? userRole : 'Developer'
          }
        />
      </div>
      {currentTicket.id !== '' && (
        <div className="flex flex-col justify-between h-full w-full rounded-r-xl">
          <div className="overflow-y-hidden hover:overflow-y-scroll w-full h-full pr-[5px] hover:pr-0">
            <div className="w-full h-full pt-[72px] xl:px-10 px-5 flex flex-col gap-10">
              <TicketDisplay
                isLoading={isLoading}
                issue={data || undefined}
                variant={
                  myTeam && userRole === 'Project Manager'
                    ? userRole
                    : 'Developer'
                }
              />
              <Chronology isLoading={isLoading} events={chronology} />
            </div>
          </div>
          <Timer ticketId={currentTicket.id} ticketName={currentTicket.name} />
        </div>
      )}
    </div>
  ) : (
    <div className="h-full w-full flex flex-col justify-center">
      <TicketListWrapper
        currentTicket={currentTicket}
        userRole={
          myTeam && userRole === 'Project Manager' ? userRole : 'Developer'
        }
      />
      {currentTicket.id !== '' && (
        <Modal onClose={deselectCurrentTicket} show={currentTicket.id !== ''}>
          <div className="max-h-[70vh] flex flex-col bg-gray-700 items-center h-full max-w-screen border-t ">
            <div
              className="overflow-y-auto"
              style={{
                boxShadow: 'inset 0px -104px 47px 0px rgba(0,0,0,1)'
              }}
            >
              <button
                onClick={deselectCurrentTicket}
                className="-rotate-90 hover:bg-gray-500 absolute top-0 left-0 rounded-full m-4"
              >
                <Icon name="CaretUpIcon" width="32" height="32" />
              </button>
              <div className="w-screen h-full py-[72px] px-8 flex flex-col gap-10">
                <TicketDisplay
                  isLoading={isLoading}
                  issue={data || undefined}
                  variant={
                    myTeam && userRole === 'Project Manager'
                      ? userRole
                      : 'Developer'
                  }
                />
                <Chronology isLoading={isLoading} events={chronology} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default TicketsSection
