import React from 'react'
import { type OptionAttr } from '@components/Filter/Filter'
import useScreenSize from '@hooks/useScreenSize'
import Body1 from '@utils/typography/body1/body1'
import { GridList } from '@components/GridList/GridList'

export interface FilterSectionProps {
  handleSelect: (options: OptionAttr[]) => void
  handleSearch: (value: string) => void
}

const FilterSection: React.FC<FilterSectionProps> = () =>
  //   handleSelect
  //   handleSearch

  {
    //   const [showFilter, setShowFilter] = useState<boolean>(false)
    //   const [searchedValue, setSearchedValue] = useState<string>('')
    //   const [selectedOptions, setSelectedOptions] = useState<OptionAttr[]>([])
    const screen = useScreenSize()

    //   useEffect(() => {
    //     handleSelect(selectedOptions)
    //   }, [handleSelect, selectedOptions])

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
      <div className="w-[467px] rounded-tl-xl border border-white-10 bg-gray-500 flex items-center gap-8 py-[22px] px-6">
        <div className="flex gap-2">
          <Body1 className="text-lg leading-[22px] text-white">
            Assigned to me
          </Body1>
          <GridList />
        </div>
        <div className="flex gap-2"></div>
      </div>
    ) : (
      <div></div>
    )
  }

export default FilterSection
