import FilterSection from '@components/FilterSection/FilterSection'
import { type OptionAttr } from '@components/Filter/Filter'
import TicketList from '@components/TicketList/TicketList'
import { useState } from 'react'
import TicketListSmallDisplay from '@components/TicketListSmallDisplay/TicketListSmallDisplay'
import { type IssueView } from '@utils/types'
import Timer from '@components/Timer/Timer'
import useScreenSize from '@hooks/useScreenSize'

interface TicketListWrapperProps {
  currentTicket: IssueView
  userRole: 'Project Manager' | 'Developer'
}

const TicketListWrapper: React.FC<TicketListWrapperProps> = ({
  currentTicket,
  userRole
}: TicketListWrapperProps): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<OptionAttr[]>([])
  const [searchedTicket, setSearchedTicket] = useState<string>('')
  const [outOfEstimation, setOutOfEstimation] = useState<boolean>(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const screen = useScreenSize()

  return (
    <div className="flex flex-col max-w-full md:max-w-[467px] items-center justify-center h-full w-full border-r border-white/10 md:my-0 my-[70px]">
      <FilterSection
        handleSelect={(options: OptionAttr[]) => {
          setSelectedFilters(options)
        }}
        handleSearch={setSearchedTicket}
        handleView={setView}
        handleOutOfEstimation={setOutOfEstimation}
        userRole={userRole}
      />
      {view === 'grid' && (
        <TicketList
          filters={selectedFilters}
          searchedTicket={searchedTicket}
          isOutOfEstimation={outOfEstimation}
          isProjectManager={userRole === 'Project Manager'}
          currentTicket={currentTicket}
        />
      )}
      {view === 'list' && (
        <TicketListSmallDisplay
          filters={selectedFilters}
          searchedTicket={searchedTicket}
          isOutOfEstimation={outOfEstimation}
          isProjectManager={userRole === 'Project Manager'}
          currentTicket={currentTicket}
        />
      )}
      {screen.width < 768 && (
        <Timer ticketId={currentTicket.id} ticketName={currentTicket.name} />
      )}
    </div>
  )
}

export default TicketListWrapper
