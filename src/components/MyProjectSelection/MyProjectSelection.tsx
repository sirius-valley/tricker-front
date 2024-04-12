import React, { useState, useEffect } from 'react'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { type MyProjectsOption } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import useScreenSize from '@hooks/useScreenSize'
import { useGetMyProjects } from '@data-provider/query'
import { useCurrentProjectId } from '@redux/hooks'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const MyProjectSelect: React.FC = () => {
  const currentProjectId = useCurrentProjectId()
  const { showSnackBar } = useSnackBar()
  const { data: options, isLoading, error } = useGetMyProjects('') // TODO add isLoading and Error
  const [selectedProject, setSelectedProject] = useState<
    MyProjectsOption | undefined
  >(options?.find((project) => project.id === currentProjectId))

  const screenSize = useScreenSize()
  const isMobile = screenSize.width <= 768

  useEffect(() => {
    if (selectedProject === undefined && options) {
      setSelectedProject(options[0])
    }
    if (error) {
      showSnackBar(error.message, 'error')
    }
  }, [options, showSnackBar])

  const handleSelect = (selectedProject: MyProjectsOption): void => {
    setSelectedProject(selectedProject)
  }
  return isLoading ? (
    <div className="pb-1 w-full">
      <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
        {Array.from({ length: 14 }, (_, index) => (
          <Skeleton key={index} height={48} containerClassName="h-[14px]" />
        ))}
      </SkeletonTheme>
    </div>
  ) : (
    <div className="relative w-full md:rounded-bl-xl h-full">
      <div className="h-full w-full md:rounded-bl-xl overflow-y-auto">
        <div
          className={` bg-gray-500 md:rounded-bl-xl w-full rounded-lg md:rounded-none`}
        >
          <div
            style={{ width: 'calc(100% - 5px)' }}
            className={`absolute bottom-0 h-[131px] bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 md:rounded-bl-xl`}
          />

          <div
            className={`list-none ${isMobile ? ' max-h-[210px] scrollbar-hidden' : options && options.length > 12 ? 'h-full overflow-y-auto' : ''}`}
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
                      <NoAvatarProject
                        className={'bg-gray-500'}
                        text={option.name}
                      />
                    )}
                    <Body1
                      className={`font-inter text-[16px] overflow-hidden overflow-ellipsis whitespace-nowrap ${
                        selectedProject?.id === option.id
                          ? 'text-primary-400'
                          : 'text-white'
                      }`}
                    >
                      {option.name}
                    </Body1>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
