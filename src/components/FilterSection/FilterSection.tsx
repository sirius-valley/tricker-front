import React, { useEffect, useState } from 'react'
import { type OptionAttr } from '@components/Filter/Filter'
import useScreenSize from '@hooks/useScreenSize'
import Body1 from '@utils/typography/body1/body1'
import { GridList } from '@components/GridList/GridList'
import { SearchBar } from '@components/SearchBar/SearchBar'
import SquaredIconButton from '@components/SquaredIconButton/SquaredIconButton'
import { FilterIcon, TeamIcon } from '@components/Icon'
import H2 from '@utils/typography/h2/h2'

export interface FilterSectionProps {
  handleSelect: (options: OptionAttr[]) => void
  handleSearch: (value: string) => void
  handleView: (view: 'grid' | 'list') => void
}

const FilterSection: React.FC<FilterSectionProps> = ({
  handleSearch,
  handleView
}) =>
  //   handleSelect

  {
    //   const [showFilter, setShowFilter] = useState<boolean>(false)
    const [searchedValue, setSearchedValue] = useState<string>('')
    //   const [selectedOptions, setSelectedOptions] = useState<OptionAttr[]>([])
    const screen = useScreenSize()

    useEffect(() => {
      handleSearch(searchedValue)
    }, [handleSearch, searchedValue])

    //   const handleSelectedOptions = (option: OptionAttr): void => {
    //     option.selected = !option.selected
    //     if (option.selected) {
    //       setSelectedOptions((prevOptions: OptionAttr[]) => [
    //         ...prevOptions,
    //         option
    //       ])
    //     } else {
    //       setSelectedOptions((prevOptions: OptionAttr[]) =>
    //         prevOptions.filter((opt) => opt !== option)
    //       )
    //     }
    //   }
    const handleCheckGridList = (isList: boolean): void => {
      isList ? handleView('list') : handleView('grid')
    }

    return screen.width >= 768 ? (
      <div className="w-[467px] rounded-tl-xl border border-white-10 bg-gray-500 flex items-center gap-8 p-[22px] pl-6">
        <div className="flex w-fit gap-2 items-center">
          <Body1 className="text-[17px] leading-[22px] text-white">
            Assigned to me
          </Body1>
          <GridList onChecked={handleCheckGridList} />
        </div>
        <div className="flex gap-2 items-center">
          <SearchBar
            handleValue={setSearchedValue}
            placeholder="Search Ticket"
            variant={'desktop'}
          />
          <SquaredIconButton icon={<FilterIcon />} />
        </div>
      </div>
    ) : (
      <div className=" flex flex-col justify-center gap-4 p-6 pb-4">
        <div className="flex w-fit gap-2 items-center">
          <TeamIcon />
          <H2 className="text-xl leading-[22px] text-white">My Team</H2>
        </div>
        <div className="flex gap-4 items-center">
          <SearchBar
            handleValue={setSearchedValue}
            placeholder="Search Ticket"
            variant={'mobile'}
          />
          <SquaredIconButton icon={<FilterIcon />} isMobile />
        </div>
      </div>
    )
  }

export default FilterSection
