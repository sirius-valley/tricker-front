import React, { useState, useEffect, useRef } from 'react'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import config from '../../../tailwind.config'
import { type DropdownOption } from '@utils/types'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'

const colors = config.theme.extend.colors

interface DropdownProps {
  preSelectedOption: DropdownOption
  options: DropdownOption[]
  handleSelect: (option: DropdownOption) => void
}

export const Dropdown: React.FC<DropdownProps> = ({
  preSelectedOption,
  options,
  handleSelect
}): JSX.Element => {
  const [selectedOption, setSelectedOption] =
    useState<DropdownOption>(preSelectedOption)
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    handleSelect(selectedOption)
  }, [selectedOption, handleSelect])

  return (
    <div className="w-[224px] h-[48px]" ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          className="relative w-full cursor-pointer py-2 px-6 flex items-center justify-between focus:outline-none "
        >
          <span className="flex items-center gap-2 w-fit">
            {selectedOption.image ? (
              <img
                src={selectedOption.image}
                className="h-[32px] w-[32px] rounded-sm"
              />
            ) : (
              <NoAvatarProject text={selectedOption.title} />
            )}
            <Body2 className="text-white font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
              {selectedOption.title}
            </Body2>
          </span>
          <div className="flex items-end ">
            <Icon name="ChevronIcon" width="20" height="20" />
          </div>
        </button>
        {isOpen && (
          <ul className="absolute z-10 ml-6 w-[297px] rounded-lg py-2 border border-gray-300 bg-gray-500">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedOption(option)
                }}
                className="relative cursor-pointer select-none p-4 hover:bg-gray-400 transition-colors duration-300"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    name="CheckIcon"
                    width="20"
                    height="20"
                    fillColor={
                      selectedOption === option
                        ? colors.primary[400]
                        : 'transparent'
                    }
                  />
                  {selectedOption.image ? (
                    <img
                      src={option.image}
                      alt=""
                      className="h-5 w-5 rounded-sm"
                    />
                  ) : (
                    <NoAvatarProject text={selectedOption.title} />
                  )}

                  <Body1 className="text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {option.title}
                  </Body1>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
