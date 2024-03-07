import React, { useState, useEffect, useRef } from 'react'
import Icon from '@components/Icon/Icon'
import type * as icons from '@components/Icon/index.ts'
import Checkbox from '@components/Checkbox/Checkbox'
import Body1 from '@utils/typography/body1/body1'

export interface OptionAttr {
  option: string
  color?: string
  selected: boolean
  icon?: keyof typeof icons
}

export interface SearchButtonProps {
  statusOptions: OptionAttr[]
  priorityOptions: OptionAttr[]
  show: boolean
}

const SearchFilter: React.FC<SearchButtonProps> = ({
  statusOptions,
  priorityOptions,
  show
}) => {
  const [showStatusOptions, setShowStatusOptions] = useState(false)
  const [showPriorityOptions, setShowPriorityOptions] = useState(false)
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
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
  }

  if (!show) {
    return null
  }

  return (
    <div className="flex flex-col w-fit">
      <div className="flex justify-end pr-8">
        <div className="relative top-[8px] w-4 h-4 bg-gray-600 border border-gray-400 rotate-45" />
      </div>
      <div
        ref={filterRef}
        className={`relative w-[306px] bg-gray-600 border border-gray-400 rounded-xl h-fit`}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
      >
        <div className="flex justify-between items-center p-4 pb-2 gap-1 border-b-[1px] border-gray-400">
          <p className="font-bold text-xl text-white">Filter by:</p>
          <button
            onClick={() => {
              setSelectedOptions([])
            }}
            className="h-fit"
          >
            <Body1 className="text-primary-400">Clear filters</Body1>
          </button>
        </div>
        <div className="flex gap-[1px] rounded-b-xl bg-gray-400 flex-col">
          <button
            className={`px-4 py-3 gap-3 h-[52px] text-white flex items-center bg-gray-600 hover:bg-gray-400 cursor-pointer`}
            onClick={() => {
              setShowStatusOptions(!showStatusOptions)
            }}
          >
            <div className="w-fit">
              <div className="w-[14px] h-[14px] rounded-full bg-white" />
            </div>
            <div className="flex justify-between w-full">
              <Body1 className="font-medium leading-[19.36px]">Status</Body1>
              <Icon
                width="20"
                height="20"
                name={showStatusOptions ? 'CaretUpIcon' : 'CaretDownIcon'}
              />
            </div>
          </button>
          {showStatusOptions && (
            <div className="flex flex-col w-full gap-[1px] text-white bg-gray-400 border-gray-400">
              {statusOptions.map((option, index) => (
                <label key={index} className="w-full h-11">
                  <div className="px-5 h-full py-2 bg-gray-500 hover:bg-gray-400  flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-[10px] h-[10px] rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                      <span>{option.option}</span>
                    </div>
                    <Checkbox
                      defaultChecked={selectedOptions.includes(option.option)}
                      onChecked={() => {
                        handleStatusOptionSelect(option)
                      }}
                    />
                  </div>
                </label>
              ))}
            </div>
          )}
          <button
            style={{
              borderRadius: showPriorityOptions ? '0' : '0 0 12px 12px'
            }}
            className={`px-4 py-3 gap-2 h-[52px] text-white bg-gray-600 hover:bg-gray-400 flex items-center`}
            onClick={() => {
              setShowPriorityOptions(!showPriorityOptions)
            }}
          >
            <div className="w-5 h-5">
              <Icon name={'MediumPriorityIcon'} width="20" height="20" />
            </div>
            <div className="flex justify-between w-full">
              <Body1 className="font-medium leading-[19.36px]">Priority</Body1>
              <Icon
                width="20"
                height="20"
                name={showPriorityOptions ? 'CaretUpIcon' : 'CaretDownIcon'}
              />
            </div>
          </button>
        </div>
        {showPriorityOptions && (
          <div className="flex flex-col w-full gap-[1px] text-white bg-gray-400 border-y-[1px] border-gray-400 rounded-b-xl">
            {priorityOptions.map((option, index) => (
              <label key={index} className="w-full h-11">
                <div
                  style={{
                    borderRadius:
                      index === priorityOptions.length - 1
                        ? '0 0 12px 12px'
                        : '0'
                  }}
                  className="px-5 h-full py-2 bg-gray-500 hover:bg-gray-400  flex justify-between items-center cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <Icon name={option.icon} width={'18px'} height={'18px'} />
                    )}
                    <span>{option.option}</span>
                  </div>
                  <Checkbox
                    defaultChecked={selectedOptions.includes(option.option)}
                    onChecked={() => {
                      handlePriorityOptionSelect(option)
                    }}
                  />
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilter
