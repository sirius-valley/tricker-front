import React, { useEffect, useRef, useState } from 'react'
import Filter, { type OptionAttr } from '@components/Filter/Filter'
import useScreenSize from '@hooks/useScreenSize'
import Body1 from '@utils/typography/body1/body1'
import { GridList } from '@components/GridList/GridList'
import { SearchBar } from '@components/SearchBar/SearchBar'
import SquaredIconButton from '@components/SquaredIconButton/SquaredIconButton'
import { FilterIcon, TeamIcon } from '@components/Icon'
import H2 from '@utils/typography/h2/h2'
import { priorityOptions, statusOptions } from './mockedFilterOptions'
import Tag from '@components/Tag/Tag'
import useDebounce from '@hooks/useDebounce'

export interface FilterSectionProps {
  handleSelect: (options: OptionAttr[]) => void
  handleSearch: (value: string) => void
  handleView: (view: 'grid' | 'list') => void
}

const FilterSection: React.FC<FilterSectionProps> = ({
  handleSelect,
  handleSearch,
  handleView
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 })

  const [searchedValue, setSearchedValue] = useState<string>('')
  const [selectedOptions, setSelectedOptions] = useState<OptionAttr[]>([])
  const screen = useScreenSize()
  const filterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement

      const isClickInside = filterRef.current?.contains(target) ?? false
      if (!isClickInside) {
        setShowFilter(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelectDebounced = useDebounce((options: OptionAttr[]) => {
    handleSelect(options)
  }, 2000)
  useEffect(() => {
    handleSelectDebounced(selectedOptions)
  }, [selectedOptions, handleSelectDebounced])
  const handleSearchDebounced = useDebounce((value: string) => {
    handleSearch(value)
  }, 1000)

  useEffect(() => {
    handleSearchDebounced(searchedValue)
  }, [searchedValue, handleSearchDebounced])

  const handleCheckGridList = (isList: boolean): void => {
    isList ? handleView('list') : handleView('grid')
  }

  const handleButtonClick = (): void => {
    if (filterRef.current) {
      const buttonRect = filterRef.current.getBoundingClientRect()
      setShowFilter(!showFilter)

      const filterTop = buttonRect.bottom
      const filterLeft = buttonRect.left + buttonRect.width

      setFilterPosition({ top: filterTop, left: filterLeft - 281 })
    }
  }
  const handleRemoveTag = (index: number): void => {
    setSelectedOptions(selectedOptions.filter((_, i) => i !== index))
  }
  return screen.width >= 768 ? (
    <div className="flex flex-col justify-center justify-center">
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
          <div ref={filterRef}>
            <SquaredIconButton
              onClick={handleButtonClick}
              icon={<FilterIcon />}
            />
            {showFilter && (
              <div
                className="absolute"
                style={{ top: filterPosition.top, left: filterPosition.left }}
              >
                <Filter
                  statusOptions={statusOptions}
                  priorityOptions={priorityOptions}
                  selectedItems={selectedOptions}
                  handleSelect={(options: OptionAttr[]) => {
                    setSelectedOptions(options)
                  }}
                  show={showFilter}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedOptions.length !== 0 && (
        <div className="w-[467px] h-fit border border-white-10 bg-gray-500 flex flex-wrap items-center gap-2 py-4 px-6">
          {selectedOptions.map((option: OptionAttr, index: number) => (
            <Tag
              handleRemove={() => {
                handleRemoveTag(index)
              }}
              name={option.option}
              key={index}
            />
          ))}
        </div>
      )}
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
        <div ref={filterRef}>
          <SquaredIconButton
            onClick={handleButtonClick}
            icon={<FilterIcon />}
            isMobile
          />
          {showFilter && (
            <div
              className="absolute"
              style={{ top: filterPosition.top, left: filterPosition.left - 6 }}
            >
              <Filter
                statusOptions={statusOptions}
                priorityOptions={priorityOptions}
                selectedItems={selectedOptions}
                handleSelect={setSelectedOptions}
                show={showFilter}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterSection
