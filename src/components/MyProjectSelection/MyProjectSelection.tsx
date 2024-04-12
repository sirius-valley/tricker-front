import React, { useState, useEffect } from 'react'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { type MyProjectsOption } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import useScreenSize from '@hooks/useScreenSize'
import { useGetMyProjects } from '@data-provider/query'
import { useCurrentProjectId } from '@redux/hooks'

export const MyProjectSelect: React.FC = () => {
  const currentProject = useCurrentProjectId()

  const { data: options } = useGetMyProjects(currentProject) // TODO add isLoading and Error
  const [selectedProject, setSelectedProject] =
    useState<MyProjectsOption | null>(null)

  const screenSize = useScreenSize()
  const isMobile = screenSize.width <= 768

  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedProject(options[0])
    }
  }, [options])

  const handleSelect = (selectedProject: MyProjectsOption): void => {
    setSelectedProject(selectedProject)
  }

  return (
    <div
      className={`relative bg-gray-500 rounded-bl-lg ${isMobile ? 'md:w-[345px] md:h-[172px] rounded-lg' : 'w-[466px] h-[768px]'}`}
    >
      {!isMobile && (
        <div
          className={`absolute bottom-0 left-0 w-[calc(100% - (<scrollbar width>))] h-[131px] bg-gradient-to-b from-gray-500 via-gray-600/50 to-gray-700/50 rounded-bl-lg`}
        ></div>
      )}
      <div
        className={`list-none ${isMobile ? 'overflow-y-auto max-h-[210px] scrollbar-hidden' : options?.length > 12 ? 'h-full overflow-y-auto' : ''}`}
      >
        <div className="h-auto">
          {options?.map((option: MyProjectsOption, index: number) => (
            <li
              key={index}
              onClick={() => {
                handleSelect(option)
              }}
              className={`relative cursor-pointer select-none p-4 hover:bg-primary-400 hover:bg-opacity-5 transition-colors duration-300 ${
                selectedProject?.id === option.id && !isMobile
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
      </div>
    </div>
  )
}
