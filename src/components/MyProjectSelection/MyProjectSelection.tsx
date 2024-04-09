import React, { useCallback, useState } from 'react'
// import useScreenSize from '@hooks/useScreenSize'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { type MyProjectsOption } from '@utils/types'
// import Body2 from "@utils/typography/body2/body2";
import Body1 from '@utils/typography/body1/body1'
// import config from '../../../tailwind.config'

// const colors = config.theme.extend.colors

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
  const [selectedProject, setSelectedProject] =
    useState<MyProjectsOption>(preselectedOption)

  const handleMyProjectSelect = useCallback(
    (selectedProject: MyProjectsOption): void => {
      setSelectedProject(selectedProject)
      handleSelect(selectedProject)
    },
    [handleSelect]
  )

  return (
    <div className="w-[466px] h-[768px] relative bg-gray-500 rounded-bl-lg">
      <div className="absolute bottom-0 left-0 w-full h-[131px] bg-gradient-to-b from-gray-500 via-gray-600 to-gray-600 rounded-bl-lg"></div>
      {
        <div className="list-none">
          {options.map((option: MyProjectsOption, index: number) => (
            <li
              key={index}
              onClick={() => {
                handleMyProjectSelect(option)
              }}
              className={`relative cursor-pointer select-none p-4 hover:bg-primary-400 hover:bg-opacity-5 transition-colors duration-300 ${
                selectedProject?.id === option.id
                  ? 'bg-primary-400 bg-opacity-5 border-l-2 border-primary-400'
                  : ''
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
      }
    </div>
  )
}
