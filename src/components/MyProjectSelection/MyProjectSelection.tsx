import React, { useCallback, useState } from 'react'
// import useScreenSize from '@hooks/useScreenSize'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { type MyProjectsOption } from '@utils/types'
// import Body2 from "@utils/typography/body2/body2";
import Body1 from '@utils/typography/body1/body1'
import Icon from '@components/Icon/Icon'
import config from '../../../tailwind.config'

const colors = config.theme.extend.colors

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
    <div className="w-fit lg:w-full h-[48px]">
      {
        <ul className="absolute z-10 ml-6 w-[297px] rounded-lg py-2 px-0 border border-gray-300 bg-gray-500 list-none">
          {options.map((option: MyProjectsOption, index: number) => (
            <li
              key={index}
              onClick={() => {
                handleMyProjectSelect(option)
              }}
              className="relative cursor-pointer select-none p-4 hover:bg-gray-400 transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                <Icon
                  name="CheckIcon"
                  width="20"
                  height="20"
                  fillColor={
                    selectedProject?.id === option.id
                      ? colors.primary[400]
                      : 'transparent'
                  }
                />
                {option.image ? (
                  <img
                    src={option.image}
                    alt=""
                    className="h-5 w-5 rounded-sm"
                  />
                ) : (
                  <NoAvatarProject text={option.title} />
                )}

                <Body1 className="text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {option.title}
                </Body1>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}
