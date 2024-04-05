import React, { useEffect, useRef, useState } from 'react'
import Filter, { type OptionAttr } from '@components/Filter/Filter'
import useScreenSize from '@hooks/useScreenSize'
import Body1 from '@utils/typography/body1/body1'
import { GridList } from '@components/GridList/GridList'
import { SearchBar } from '@components/SearchBar/SearchBar'
import SquaredIconButton from '@components/SquaredIconButton/SquaredIconButton'
import { FilterIcon } from '@components/Icon'
import Tag from '@components/Tag/Tag'
import useDebounce from '@hooks/useDebounce'
import { useCurrentProjectId } from '@redux/hooks'
import { useGetFilters } from '@data-provider/query'
import {
  type StageExtended,
  Priority,
  type UserIssue,
  type OptionalIssueFilters
} from '@utils/types'
import { priorityEnumMap, setPriorityIcon } from './constants'

export interface FilterSectionProps {
  handleFilters: (options: OptionalIssueFilters) => void
  handleSearch: (value: string) => void
  handleOutOfEstimation: (isOutOfEst: boolean) => void
  handleView: (view: 'grid' | 'list') => void
  userRole?: 'Project Manager' | 'Developer'
}

const FilterSection: React.FC<FilterSectionProps> = ({
  handleFilters,
  handleSearch,
  handleOutOfEstimation,
  handleView,
  userRole = 'Developer'
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 })

  const [searchedValue, setSearchedValue] = useState<string>('')
  const [selectedOptions, setSelectedOptions] = useState<OptionAttr[]>([])
  const [selectedFilters, setSelectedFilters] = useState<OptionalIssueFilters>(
    {}
  )
  const [statusOptions, setStatusOptions] = useState<OptionAttr[]>([])
  const [priorityOptions, setPriorityOptions] = useState<OptionAttr[]>([])
  const [asigneeOptions, setAsigneeOptions] = useState<OptionAttr[]>([])
  const [outOfEstimation, setOutOfEstimation] = useState<boolean>(false)
  const screen = useScreenSize()
  const projectId = useCurrentProjectId()
  const filterRef = useRef<HTMLDivElement | null>(null)

  const { data } = useGetFilters(
    projectId,
    userRole === 'Project Manager' ? 'pm' : 'dev'
  )

  useEffect(() => {
    if (data) {
      const formattedStages: OptionAttr[] = data.stages.map(
        (stage: StageExtended) => ({
          option: stage.name,
          color: stage.color,
          selected: false,
          id: stage.id
        })
      )

      const formattedPriorities: OptionAttr[] = data.priorities.map(
        (priority: string) => ({
          option: priority,
          selected: false,
          icon: setPriorityIcon(priority),
          id: Priority[priorityEnumMap[priority]]
        })
      )

      if ('assignees' in data) {
        const formattedAssignees: OptionAttr[] = data.assignees.map(
          (assignee: UserIssue) => ({
            option: assignee.name,
            selected: false,
            id: assignee.id
          })
        )
        setAsigneeOptions(formattedAssignees)
      }

      setStatusOptions(formattedStages)
      setPriorityOptions(formattedPriorities)
    }
  }, [data])

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

  const handleSelectDebounced = useDebounce((filters: OptionalIssueFilters) => {
    handleFilters(filters)
  }, 2000)

  useEffect(() => {
    handleSelectDebounced(selectedFilters)
  }, [selectedFilters, handleSelectDebounced])

  const handleOutOfEstimationClick = useDebounce((isOutOfEst: boolean) => {
    handleOutOfEstimation(isOutOfEst)
  }, 1000)

  useEffect(() => {
    handleOutOfEstimationClick(outOfEstimation)
  }, [outOfEstimation, handleOutOfEstimationClick])

  useEffect(() => {
    handleSearch(searchedValue)
  }, [searchedValue, handleSearch])

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
    <div className="flex flex-col justify-center">
      <div className="max-w-[467px] h-fit rounded-tl-xl bg-gray-500 border-b border-white/10 flex flex-wrap items-center justify-center gap-8 p-[22px] pl-6">
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
                  preselectedFilters={selectedFilters}
                  selectedItems={selectedOptions}
                  asigneeOptions={asigneeOptions}
                  outOfEstimation={outOfEstimation}
                  handleSelect={setSelectedOptions}
                  handleFilters={setSelectedFilters}
                  show={showFilter}
                  handleOutOfEstimation={setOutOfEstimation}
                  userRole={userRole}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedOptions.length !== 0 && (
        <div className="max-w-[467px] h-fit border border-white-10 bg-gray-500 flex flex-wrap items-center gap-2 py-4 px-6">
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
    <div className="flex flex-col w-full items-center justify-center gap-4 p-6 pb-4">
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
                preselectedFilters={selectedFilters}
                asigneeOptions={asigneeOptions}
                outOfEstimation={outOfEstimation}
                handleSelect={setSelectedOptions}
                handleFilters={setSelectedFilters}
                show={showFilter}
                handleOutOfEstimation={setOutOfEstimation}
                userRole={userRole}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterSection
