import FilterSection from '@components/FilterSection/FilterSection'
import TicketList from '@components/TicketList/TicketList'
import { useState } from 'react'
import { type OptionalIssueFilters, type IssueView } from '@utils/types'
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
  const screen = useScreenSize()
  const currentTrackingTicket = useCurrentTrackingTicket()
  const [selectedFilters, setSelectedFilters] = useState<OptionalIssueFilters>(
    {}
  )
  const [searchedTicket, setSearchedTicket] = useState<string>('')
  const [outOfEstimation, setOutOfEstimation] = useState<boolean>(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div
      style={{
        height: `${screen.width >= 768 || (currentTicket.id === '' && currentTrackingTicket.id === '') ? '100%' : 'calc(100% - 84px)'}`
      }}
      className="flex flex-col w-full items-center justify-center border-r border-white/10 md:my-0"
    >
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
    </div>
  )
}

export default TicketListWrapper
