import React, { useState, useEffect, useRef } from 'react'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'
import Checkbox from '@components/Checkbox/Checkbox'

export interface SearchButtonProps {
  statusOptions: Array<{ option: string; color: string; selected: boolean }>
  priorityOptions: Array<{
    option: string
    icon: keyof typeof icons
    selected: boolean
  }>
  searchIcon?: keyof typeof icons
  priorityIcon?: keyof typeof icons
}

const SearchFilter: React.FC<SearchButtonProps> = ({
  statusOptions,
  priorityOptions,
  searchIcon,
  priorityIcon
}) => {
  const [showStatusOptions, setShowStatusOptions] = useState(false)
  const [showPriorityOptions, setShowPriorityOptions] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOption, setSelectedOption] = useState('Search')
  const filterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement

      const isClickInside = filterRef.current?.contains(target) ?? false
      if (!isClickInside) {
        setShowStatusOptions(false)
        setShowPriorityOptions(false)
        setSelectedOption('Search')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredStatusOptions = statusOptions.filter((option) =>
    option.option.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredPriorityOptions = priorityOptions.filter((option) =>
    option.option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value)
  }

  const handleStatusOptionSelect = (option: {
    option: string
    color: string
    selected: boolean
  }): void => {
    option.selected = !option.selected
    setShowStatusOptions(true)
    setShowPriorityOptions(false)
    setSelectedOption(option.option)
  }

  const handlePriorityOptionSelect = (option: {
    option: string
    icon: keyof typeof icons
    selected: boolean
  }): void => {
    option.selected = !option.selected
    setShowPriorityOptions(true)
    setShowStatusOptions(false)
    setSelectedOption(option.option)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div
      ref={filterRef}
      className={`relative w-[250px] bg-gray-500 border border-gray-300 rounded`}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}
    >
      <div className="flex items-center px-3 py-2 gap-1 border-b border-gray-300">
        {searchIcon && (
          <Icon name={searchIcon} width={'16px'} height={'16px'} />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder={selectedOption}
          className="bg-transparent text-sm text-white placeholder-gray-200 focus:outline-none"
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-col">
        <button
          className="px-4 py-2 gap-3 text-white flex items-center rounded hover:bg-gray-400 cursor-pointer"
          onClick={() => {
            setShowStatusOptions(!showStatusOptions)
            setShowPriorityOptions(false)
            setSelectedOption('Status')
          }}
          style={{
            display:
              showPriorityOptions || selectedOption === 'Status'
                ? 'none'
                : 'flex'
          }}
        >
          <div
            className="w-3 h-3 rounded-full bg-white"
          />
          <span>Status</span>
        </button>
        <button
          className="px-3 py-2 gap-2 text-white hover:bg-gray-400 rounded flex items-center"
          onClick={() => {
            setShowPriorityOptions(!showPriorityOptions)
            setShowStatusOptions(false)
            setSelectedOption('Priority')
          }}
          style={{
            display:
              showStatusOptions || selectedOption === 'Priority'
                ? 'none'
                : 'flex'
          }}
        >
          {priorityIcon && (
            <Icon name={priorityIcon} width={'18px'} height={'18px'} />
          )}
          <span>Priority</span>
        </button>
      </div>
      {showStatusOptions && (
        <div className="relative w-full text-white bg-gray-500 border-gray-300 rounded-b">
          {filteredStatusOptions.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 gap-3 hover:bg-gray-400 rounded flex items-center"
            >
              <Checkbox
                defaultChecked={option.selected}
                onChange={() => {
                  handleStatusOptionSelect(option)
                }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: option.color }}
              />
              <span>{option.option}</span>
            </div>
          ))}
        </div>
      )}
      {showPriorityOptions && (
        <div className="relative w-full text-white bg-gray-500 border-gray-300 rounded-b">
          {filteredPriorityOptions.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 gap-2 hover:bg-gray-400 rounded text-white flex items-center"
            >
              <Checkbox
                defaultChecked={option.selected}
                onChange={() => {
                  handlePriorityOptionSelect(option)
                }}
              />
              {priorityIcon && (
                <Icon name={option.icon} width={'18px'} height={'18px'} />
              )}
              <span>{option.option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchFilter
