import React, { useState } from 'react'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'
import Checkbox from '@components/Checkbox/Checkbox'

export interface SearchButtonProps {
  statusOptions: Array<{ option: string; color: string }>
  priorityOptions: Array<{ option: string; icon: keyof typeof icons }>
  searchIcon?: keyof typeof icons
  statusIcon?: keyof typeof icons
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
  }): void => {
    console.log('Status option selected:', option)
  }

  const handlePriorityOptionSelect = (option: {
    option: string
    icon: keyof typeof icons
  }): void => {
    console.log('Priority option selected:', option)
  }

  return (
    <div className="w-[250px] h-104 bg-gray-500 rounded-lg border border-gray-300 gap-1">
      <div className="flex items-center">
        <div className="px-4 py-2 gap-2 flex items-center">
          {searchIcon && (
            <Icon name={searchIcon} width={'16px'} height={'16px'} />
          )}
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white focus:outline-none"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="border-b border-gray-300"></div>
      <div
        className="relative hover:bg-gray-400 rounded-lg"
        style={{ zIndex: showStatusOptions ? 50 : 1 }}
      >
        <button
          className="px-4 py-2 gap-2 text-white flex items-center justify-between cursor-pointer"
          onClick={() => {
            setShowStatusOptions(!showStatusOptions)
          }}
        >
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: 'white' }}
          />
          <span>Status</span>
        </button>
        {showStatusOptions && (
          <div className="absolute text-white w-[249px] bg-gray-500 border border-gray-300 rounded-b">
            {filteredStatusOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 gap-3 hover:bg-gray-400 cursor-pointer flex items-center"
                onClick={() => {
                  handleStatusOptionSelect(option)
                }}
              >
                <Checkbox />
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: option.color }}
                />
                <span>{option.option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="relative hover:bg-gray-400 rounded-lg"
        style={{ zIndex: showPriorityOptions ? 10 : 1 }}
      >
        <button
          className="px-4 py-2 gap-2 text-white flex items-center justify-between cursor-pointer"
          onClick={() => {
            setShowPriorityOptions(!showPriorityOptions)
          }}
        >
          {priorityIcon && (
            <Icon name={priorityIcon} width={'18px'} height={'18px'} />
          )}
          <span>Priority</span>
        </button>
        {showPriorityOptions && (
          <div className="absolute text-white w-[250px] bg-gray-500 border border-gray-300 rounded-b">
            {filteredPriorityOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 gap-3 hover:bg-gray-400 rounded-lg cursor-pointer flex items-center"
                onClick={() => {
                  handlePriorityOptionSelect(option)
                }}
              >
                <Checkbox />
                {priorityIcon && (
                  <Icon name={option.icon} width={'18px'} height={'18px'} />
                )}
                <span>{option.option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilter;
