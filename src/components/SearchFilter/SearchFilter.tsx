import React, { useState, useEffect, useRef } from 'react'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'
import Checkbox from '@components/Checkbox/Checkbox'

export interface OptionAttr {
  option: string
  color?: string
  selected: boolean
  icon?: keyof typeof icons
}

export interface SearchButtonProps {
  statusOptions: OptionAttr[]
  priorityOptions: OptionAttr[]
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
  const [searchOption, setSearchOption] = useState('Search')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const filterRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement

      const isClickInside = filterRef.current?.contains(target) ?? false
      if (!isClickInside) {
        setShowStatusOptions(false)
        setShowPriorityOptions(false)
        setSearchOption('Search')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value)
  }

  const handleStatusOptionSelect = (option: OptionAttr): void => {
    option.selected = !option.selected
    if (option.selected) {
      setSelectedOptions((prevOptions: string[]) => [
        ...prevOptions,
        option.option
      ])
    } else {
      setSelectedOptions((prevOptions: string[]) =>
        prevOptions.filter((opt) => opt !== option.option)
      )
    }
    setShowStatusOptions(true)
    setShowPriorityOptions(false)
    setSearchOption('Status')
  }

  const handlePriorityOptionSelect = (option: OptionAttr): void => {
    option.selected = !option.selected
    if (option.selected) {
      setSelectedOptions((prevOptions: string[]) => [
        ...prevOptions,
        option.option
      ])
    } else {
      setSelectedOptions((prevOptions: string[]) =>
        prevOptions.filter((opt) => opt !== option.option)
      )
    }
    setShowPriorityOptions(true)
    setShowStatusOptions(false)
    setSearchOption('Priority')
  }

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
          placeholder={searchOption}
          className="bg-transparent text-sm text-white placeholder-gray-200 focus:outline-none"
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex flex-col">
        <button
          className={`px-4 py-2 gap-3 text-white flex items-center rounded hover:bg-gray-400 cursor-pointer ${
            searchOption === 'Search' ? 'flex' : 'hidden'
          }`}
          onClick={() => {
            setShowStatusOptions(!showStatusOptions)
            setShowPriorityOptions(false)
            setSearchOption('Status')
          }}
        >
          <div className="w-3 h-3 rounded-full bg-white" />
          <span>Status</span>
        </button>
        <button
          className={`px-3 py-2 gap-2 text-white hover:bg-gray-400 rounded flex items-center ${
            searchOption === 'Search' ? 'flex' : 'hidden'
          }`}
          onClick={() => {
            setShowPriorityOptions(!showPriorityOptions)
            setShowStatusOptions(false)
            setSearchOption('Priority')
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
          {statusOptions
            .filter((option) =>
              option.option.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((option, index) => (
              <label key={index} className="w-full">
                <div className="px-4 py-2 gap-3 hover:bg-gray-400 rounded flex items-center cursor-pointer">
                  <Checkbox
                    defaultChecked={selectedOptions.includes(option.option)}
                    onChecked={() => {
                      handleStatusOptionSelect(option)
                    }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  <span>{option.option}</span>
                </div>
              </label>
            ))}
        </div>
      )}
      {showPriorityOptions && (
        <div className="relative w-full text-white bg-gray-500 border-gray-300 rounded-b">
          {priorityOptions
            .filter((option) =>
              option.option.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((option, index) => (
              <label key={index} className="w-full">
                <div className="px-4 py-2 gap-2 hover:bg-gray-400 rounded text-white flex items-center cursor-pointer">
                  <Checkbox
                    defaultChecked={selectedOptions.includes(option.option)}
                    onChecked={() => {
                      handlePriorityOptionSelect(option)
                    }}
                  />
                  {option.icon && (
                    <Icon name={option.icon} width={'18px'} height={'18px'} />
                  )}
                  <span>{option.option}</span>
                </div>
              </label>
            ))}
        </div>
      )}
    </div>
  )
}

export default SearchFilter
