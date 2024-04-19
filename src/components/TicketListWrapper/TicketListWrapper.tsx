import FilterSection from '@components/FilterSection/FilterSection'
import TicketList from '@components/TicketList/TicketList'
import { useState } from 'react'
import { type OptionalIssueFilters, type IssueView } from '@utils/types'
import Timer from '@components/Timer/Timer'
import useScreenSize from '@hooks/useScreenSize'
import { useCurrentTrackingTicket } from '@redux/hooks'

interface TicketListWrapperProps {
  currentTicket: IssueView
  userRole: 'Project Manager' | 'Developer'
}

const TicketListWrapper: React.FC<TicketListWrapperProps> = ({
  currentTicket,
  userRole
}: TicketListWrapperProps): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<OptionalIssueFilters>(
    {}
  )
  const [searchedTicket, setSearchedTicket] = useState<string>('')
  const [outOfEstimation, setOutOfEstimation] = useState<boolean>(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const screen = useScreenSize()
  const currentTrackingTicket = useCurrentTrackingTicket()

  return (
    <div className="flex flex-col max-w-full md:max-w-[467px] items-center justify-center h-full w-full border-r border-white/10 md:my-0 my-[70px]">
      <FilterSection
        handleFilters={(options: OptionalIssueFilters) => {
          setSelectedFilters(options)
        }}
        handleSearch={setSearchedTicket}
        handleView={setView}
        handleOutOfEstimation={setOutOfEstimation}
        userRole={userRole}
      />
      <TicketList
        variant={view}
        filters={selectedFilters}
        searchedTicket={searchedTicket}
        isOutOfEstimation={outOfEstimation}
        isProjectManager={userRole === 'Project Manager'}
        currentTicket={currentTicket}
      />
      {screen.width < 768 && currentTrackingTicket.id !== '' && (
        <Timer
          ticketId={currentTrackingTicket.id}
          ticketName={currentTrackingTicket.name}
        />
      )}
    </div>
  )
}

export default TicketListWrapper
