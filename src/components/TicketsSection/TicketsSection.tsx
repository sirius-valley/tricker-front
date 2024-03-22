import Chronology from '@components/Chronology/Chronology'
import { MockedEvents } from '@components/Chronology/MockedEvents'
import TicketDisplay from '@components/TicketDisplay/TicketDisplay'
import TicketListWrapper from '@components/TicketListWrapper/TicketListWrapper'
import { useCurrentTicket, useUser } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'

export interface TicketsSectionProps {
  isProjectManager?: boolean
}

const TicketsSection: React.FC = ({
  isProjectManager = false
}: TicketsSectionProps): JSX.Element => {
  const user = useUser()
  const currentTicket = useCurrentTicket()
  const navigate = useNavigate()
  if (user.id === '') navigate('/login')

  return (
    <div className="h-full w-full flex items-center justify-center">
      <TicketListWrapper />
      <div className="flex flex-col items-center h-full w-full rounded-r-xl">
        <div className="overflow-y-auto">
          <div className="w-full h-full py-[72px] px-10 flex flex-col gap-10">
            <TicketDisplay
              issue={currentTicket}
              variant={isProjectManager ? 'Project Manager' : 'Developer'}
            />
            <Chronology events={MockedEvents} />
          </div>
        </div>
        {/* <TimerComponent /> */}
      </div>
    </div>
  )
}

export default TicketsSection
