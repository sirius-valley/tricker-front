import React, { useState, useEffect, useCallback } from 'react'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { type MyProjectsOption } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import useScreenSize from '@hooks/useScreenSize'
import { useGetMyProjects } from '@data-provider/query'
import { useAppDispatch, useCurrentProjectId } from '@redux/hooks'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { setSelectedProjectInfo } from '@redux/user'
import NoTicketMessage from '@components/NoTicketMessage/NoTicketMessage'

interface MyProjectSelectProps {
  searchedProject?: string
}

export const MyProjectSelect: React.FC<MyProjectSelectProps> = ({
  searchedProject = ''
}: MyProjectSelectProps): JSX.Element => {
  const [selectedProject, setSelectedProject] = useState<MyProjectsOption>({
    id: '',
    name: '',
    image: ''
  })

  const dispatch = useAppDispatch()
  const currentProjectId = useCurrentProjectId()
  const { showSnackBar } = useSnackBar()
  const memoizedShowSnackBar = useCallback(showSnackBar, [])
  const { data: options, isLoading, error } = useGetMyProjects(searchedProject)
  const screenSize = useScreenSize()

  const isMobile = screenSize.width <= 768

  dispatch(setSelectedProjectInfo(selectedProject))

  if (selectedProject.id === '' && options && !isMobile) {
    setSelectedProject(
      options.find((project) => project.id === currentProjectId) || options[0]
    )
    dispatch(
      setSelectedProjectInfo(
        options.find((project) => project.id === currentProjectId) || options[0]
      )
    )
  }

  useEffect(() => {
    if (error) {
      memoizedShowSnackBar(error.message, 'error')
    }
  }, [error, memoizedShowSnackBar])

  const handleSelect = (selectedOption: MyProjectsOption): void => {
    if (options) {
      const selectedProject = options.find(
        (project: MyProjectsOption) => project.id === selectedOption.id
      )
      if (selectedProject) {
        setSelectedProject(selectedProject)
        dispatch(setSelectedProjectInfo(selectedProject))
      }
    }
  }
  console.log(options)
  return (
    <div
      className={`${isMobile && 'p-6'} relative w-full h-full md:rounded-bl-xl rounded-xl max-h-full ${isLoading && 'overflow-y-hidden'}`}
    >
      {isLoading && (
        <div className="pb-1 w-full max-h-full">
          <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
            {Array.from({ length: 20 }, (_, index) => (
              <Skeleton key={index} height={48} containerClassName="h-[14px]" />
            ))}
          </SkeletonTheme>
        </div>
      )}
      <div
        className={`${isMobile && 'bg-gray-500'} ${options && options.length <= 12 && options.length !== 0 ? 'h-fit' : 'h-full'} rounded-xl max-h-full md:rounded-none md:h-full w-full md:rounded-bl-xl ${isLoading ? 'overflow-y-hidden' : 'overflow-y-auto'}`}
      >
        {options && options.length !== 0 && !error ? (
          <div
            className={`bg-gray-500 rounded-xl md:rounded-bl-xl w-full rounded-lg md:rounded-none`}
          >
            {!isMobile && (
              <div
                style={{
                  width: `calc(100% - 5px - ${isMobile ? '48px' : '0px'})`
                }}
                className={`absolute bottom-0 h-[131px] bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 rounded-b-xl md:rounded-bl-xl`}
              />
            )}
            <div className={`list-none`}>
              <div className="h-fit">
                {options?.map((option: MyProjectsOption, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleSelect(option)
                    }}
                    className={`flex w-full border-l-[2px] gap-2 relative cursor-pointer select-none p-4 hover:bg-primary-400 hover:bg-opacity-5 transition-colors duration-300 ${
                      selectedProject?.id === option.id && !isMobile
                        ? 'bg-primary-400 bg-opacity-5 border-primary-400'
                        : 'bg-transparent border-gray-500'
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
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <NoTicketMessage
              title="No projects matches with your search"
              subtitle=""
            />
          </div>
        )}
      </div>
    </div>
  )
}
