// SearchButton.tsx
import React, { useState } from 'react'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'

export interface SearchButtonProps {
  statusOptions: string[]
  priorityOptions: string[]
  searchIcon?: keyof typeof icons
  statusIcon?: keyof typeof icons
  priorityIcon?: keyof typeof icons
  checkboxIcon?: keyof typeof icons
}

const SearchButton: React.FC<SearchButtonProps> = ({
  statusOptions,
  priorityOptions,
  searchIcon,
  statusIcon,
  priorityIcon,
  checkboxIcon
}) => {
  const [showStatusOptions, setShowStatusOptions] = useState(false)
  const [showPriorityOptions, setShowPriorityOptions] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStatusOptions = statusOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredPriorityOptions = priorityOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value)
  }

  const handleStatusOptionSelect = (option: string) : void => {
    console.log('Status option selected:', option)
    // Aquí puedes agregar la lógica para filtrar o manejar la selección de la opción de status
  }

  const handlePriorityOptionSelect = (option: string) : void => {
    console.log('Priority option selected:', option)
    // Aquí puedes agregar la lógica para filtrar o manejar la selección de la opción de priority
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
        className="relative hover:bg-gray-400"
        style={{ zIndex: showStatusOptions ? 50 : 1 }}
      >
        <button
          className="px-4 py-2 gap-2 text-white flex items-center justify-between cursor-pointer"
          onClick={() => {
            setShowStatusOptions(!showStatusOptions)
          }}
        >
          {statusIcon && (
            <Icon name={statusIcon} width={'18px'} height={'18px'} />
          )}
          <span>Status</span>
        </button>
        {showStatusOptions && (
          <div className="absolute text-white w-[250px] bg-gray-500 border border-gray-300 rounded-md">
            {filteredStatusOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 gap-1 hover:bg-gray-400 cursor-pointer flex items-center"
                onClick={() => {
                  handleStatusOptionSelect(option)
                }}
              >
                {statusIcon && (
                  <Icon name={statusIcon} width={'18px'} height={'18px'} />
                )}
                {statusIcon && (
                  <Icon name={statusIcon} width={'18px'} height={'18px'} />
                )}
                <span>{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="relative hover:bg-gray-400"
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
          <div className="absolute text-white w-[250px] bg-gray-500 border border-gray-300 rounded-md">
            {filteredPriorityOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 gap-1 hover:bg-gray-400 cursor-pointer flex items-center"
                onClick={() => {
                  handlePriorityOptionSelect(option)
                }}
              >
                {checkboxIcon && (
                  <Icon name={checkboxIcon} width={'18px'} height={'18px'} />
                )}
                {priorityIcon && (
                  <Icon name={priorityIcon} width={'18px'} height={'18px'} />
                )}
                <span>{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchButton
