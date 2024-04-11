import React, { useCallback, useState } from 'react'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { type MyProjectsOption } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import useScreenSize from '@hooks/useScreenSize'

export interface MyProjectSelectProps {
  preselectedOption: MyProjectsOption
  options: MyProjectsOption[]
  handleSelect: (option: MyProjectsOption) => void
}

export const Select: React.FC<MyProjectSelectProps> = ({
  preselectedOption,
  options,
  handleSelect
}): JSX.Element => {
  const screenSize = useScreenSize()
  const [selectedProject, setSelectedProject] =
    useState<MyProjectsOption>(preselectedOption)

  const handleMyProjectSelect = useCallback(
    (selectedProject: MyProjectsOption): void => {
      setSelectedProject(selectedProject)
      handleSelect(selectedProject)
    },
    [handleSelect]
  )
  const isMobile = screenSize.width <= 768

  return (
    <div
      className={`relative bg-gray-500 rounded-bl-lg ${isMobile ? 'md:w-[345px] md:h-[172px] rounded-lg' : 'w-[466px] h-[768px]'}`}
    >
      <div
        className={`absolute z-0 bottom-0 left-0 w-[calc(100% - (<scrollbar width>))] h-[131px] bg-gradient-to-b from-gray-500 via-gray-600/50 to-gray-700/50 ${isMobile ? 'z-0 rounded-lg' : 'rounded-bl-lg'}`}
      ></div>
      <div
        className={`list-none ${isMobile ? 'overflow-y-auto max-h-[210px] scrollbar-hidden' : options.length > 12 ? 'h-[calc(100%-131px)] overflow-y-auto' : ''}`}
      >
        <div className="h-auto">
          {options.map((option: MyProjectsOption, index: number) => (
            <li
              key={index}
              onClick={() => {
                handleMyProjectSelect(option)
              }}
              className={`relative cursor-pointer select-none p-4 hover:bg-primary-400 hover:bg-opacity-5 transition-colors duration-300 ${
                selectedProject?.id === option.id && !isMobile
                  ? 'bg-primary-400 bg-opacity-5 border-l-2 border-primary-400'
                  : 'border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                {option.image ? (
                  <img
                    src={option.image}
                    alt=""
                    className="h-5 w-5 rounded-sm"
                  />
                ) : (
                  <NoAvatarProject text={option.title} />
                )}
                <Body1
                  className={`font-inter text-[16px] overflow-hidden overflow-ellipsis whitespace-nowrap ${
                    selectedProject?.id === option.id
                      ? 'text-primary-400'
                      : 'text-white'
                  }`}
                >
                  {option.title}
                </Body1>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}
