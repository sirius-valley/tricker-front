import FilterSection from '@components/FilterSection/FilterSection'
import { type OptionAttr } from '@components/Filter/Filter'
import TicketList from '@components/TicketList/TicketList'
import { useState } from 'react'
import TicketListSmallDisplay from '@components/TicketListSmallDisplay/TicketListSmallDisplay'

const TicketListWrapper = (): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<OptionAttr[]>([])
  const [searchedTicket, setSearchedTicket] = useState<string>('')
  const [outOfEstimation, setOutOfEstimation] = useState<boolean>(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex flex-col items-center justify-center h-full w-fit">
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
        />
      )}
      {view === 'list' && (
        <TicketListSmallDisplay
          filters={selectedFilters}
          searchedTicket={searchedTicket}
          isOutOfEstimation={outOfEstimation}
        />
      )}
    </div>
  )
}

export default TicketListWrapper
