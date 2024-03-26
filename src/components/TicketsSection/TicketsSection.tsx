import Chronology from '@components/Chronology/Chronology'
import Icon from '@components/Icon/Icon'
import { Modal } from '@components/Modal/Modal'
import TicketDisplay from '@components/TicketDisplay/TicketDisplay'
import TicketListWrapper from '@components/TicketListWrapper/TicketListWrapper'
import useScreenSize from '@hooks/useScreenSize'
import { useAppDispatch, useCurrentTicket, useUser } from '@redux/hooks'
import { setCurrentTicket } from '@redux/user'
import { Priority, StageType } from '@utils/types'
import { useNavigate } from 'react-router-dom'
import Timer from '@components/Timer/Timer'

export interface TicketsSectionProps {
  isProjectManager?: boolean
}

const TicketsSection: React.FC = ({
  isProjectManager = true
}: TicketsSectionProps): JSX.Element => {
  const user = useUser()
  const screen = useScreenSize()
  const currentTicket = useCurrentTicket()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  if (user.id === '') navigate('/login')

  const deselectCurrentTicket = (): void => {
    dispatch(
      setCurrentTicket({
        id: '',
        assignee: null,
        stage: { id: '', name: '', type: StageType.BACKLOG },
        name: '',
        title: '',
        description: '',
        priority: Priority.NO_PRIORITY,
        storyPoints: 0,
        labels: []
      })
    )
  }

  return screen.width >= 768 ? (
    <div className="h-full w-full flex items-center">
      <TicketListWrapper currentTicket={currentTicket} />
      {currentTicket.id !== '' && (
        <div className="flex flex-col justify-between h-full w-full rounded-r-xl">
          <div className="overflow-y-hidden hover:overflow-y-auto h-full">
            <div className="w-full h-full pt-[72px] xl:px-10 px-5 flex flex-col gap-10">
              <TicketDisplay
                issue={currentTicket}
                variant={isProjectManager ? 'Project Manager' : 'Developer'}
              />
              <Chronology />
            </div>
          </div>
          <Timer ticketId={currentTicket.id} ticketName={currentTicket.name} />
        </div>
      )}
    </div>
  ) : (
    <div className="h-full w-full flex flex-col justify-center">
      <TicketListWrapper currentTicket={currentTicket} />
      {currentTicket.id !== '' && (
        <Modal onClose={deselectCurrentTicket} show={currentTicket.id !== ''}>
          <div className="max-h-[70vh] flex flex-col bg-gray-700 items-center h-full w-full border-t ">
            <div
              className="overflow-y-auto"
              style={{
                boxShadow: 'inset 0px -104px 47px 0px rgba(0,0,0,1);'
              }}
            >
              <button
                onClick={deselectCurrentTicket}
                className="-rotate-90 hover:bg-gray-500 absolute top-0 left-0 rounded-full m-4"
              >
                <Icon name="CaretUpIcon" width="32" height="32" />
              </button>
              <div className="w-full h-full py-[72px] px-8 flex flex-col gap-10">
                <TicketDisplay
                  issue={currentTicket}
                  variant={isProjectManager ? 'Project Manager' : 'Developer'}
                />
                <Chronology />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default TicketsSection
