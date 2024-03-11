import React, { useEffect, useState } from 'react'
import { type OptionAttr } from '@components/Filter/Filter'
import useScreenSize from '@hooks/useScreenSize'
import Body1 from '@utils/typography/body1/body1'
import { GridList } from '@components/GridList/GridList'
import { SearchBar } from '@components/SearchBar/SearchBar'
import SquaredIconButton from '@components/SquaredIconButton/SquaredIconButton'
import { FilterIcon } from '@components/Icon'

export interface FilterSectionProps {
  handleSelect: (options: OptionAttr[]) => void
  handleSearch: (value: string) => void
}

const FilterSection: React.FC<FilterSectionProps> = ({ handleSearch }) =>
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

    return screen.width >= 768 ? (
      <div className="w-[467px] rounded-tl-xl border border-white-10 bg-gray-500 flex items-center gap-8 p-[22px] pl-6">
        <div className="flex w-fit gap-2 items-center">
          <Body1 className="text-[17px] leading-[22px] text-white">
            Assigned to me
          </Body1>
          <GridList />
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
      <div></div>
    )
  }

export default FilterSection
