import FilterSection from '@components/FilterSection/FilterSection'
import { type OptionAttr } from '@components/Filter/Filter'
import TicketList from '@components/TicketList/TicketList'
import { useState } from 'react'
import TicketListSmallDisplay from '@components/TicketListSmallDisplay/TicketListSmallDisplay'
import { type IssueView } from '@utils/types'

interface TicketListWrapperProps {
  currentTicket: IssueView
}

const TicketListWrapper: React.FC<TicketListWrapperProps> = ({
  currentTicket
}: TicketListWrapperProps): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<OptionAttr[]>([])
  const [searchedTicket, setSearchedTicket] = useState<string>('')
  const [outOfEstimation, setOutOfEstimation] = useState<boolean>(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex flex-col max-w-full md:max-w-[467px] items-center justify-center h-full w-full border-r border-white/10">
      <FilterSection
        handleSelect={(options: OptionAttr[]) => {
          setSelectedFilters(options)
        }}
        handleSearch={setSearchedTicket}
        handleView={setView}
        handleOutOfEstimation={setOutOfEstimation}
      />
      {view === 'grid' && (
        <TicketList
          filters={selectedFilters}
          searchedTicket={searchedTicket}
          isOutOfEstimation={outOfEstimation}
          isProjectManager={false}
          currentTicket={currentTicket}
        />
      )}
      {view === 'list' && (
        <TicketListSmallDisplay
          filters={selectedFilters}
          searchedTicket={searchedTicket}
          isOutOfEstimation={outOfEstimation}
          isProjectManager={false}
          currentTicket={currentTicket}
        />
      )}
    </div>
  )
}

export default TicketListWrapper
