import '../../index.css'
import React, { useState } from 'react'
import { Tooltip } from '@components/Tooltip/Tooltip'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import H1 from '@utils/typography/h1/h1'
import HelperText from '@utils/typography/helpertext/helpertext'
import RadioButton from '@components/RadioButton/RadioButton'
import { useGetPreIntegratedProjects } from '@data-provider/query'
import { type ProjectPreIntegrated } from '@utils/types'
import useScreenSize from '@hooks/useScreenSize'
import NotificationBadge from '@components/NotificationBadge/NotificationBadge'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export interface SelectProjectProps {
  handleSelection: (project: ProjectPreIntegrated) => void
  providerKey: string
  provider: string
}

const SelectProject: React.FC<SelectProjectProps> = ({
  handleSelection,
  providerKey,
  provider
}) => {
  const { data, isLoading, error } = useGetPreIntegratedProjects(
    providerKey,
    provider
  )
  const [selectedProject, setSelectedProject] =
    useState<ProjectPreIntegrated | null>(null)
  const screenSize = useScreenSize()

  return (
    <>
      {error && (
        <div className="h-[505px] flex items-center">
          <NotificationBadge
            variant="error"
            className="md:text-[15px] text-[13px]"
          >
            {
              'Error fetching the projects, please try again later or contact support'
            }
          </NotificationBadge>
        </div>
      )}
      {!error && (
        <div className="flex flex-col items-center justify-center mx-8 lg:h-[360px] md:w-fit lg:w-[1032px] bg-gray-600 shadow-2 md:shadow-none border border-primary-400 py-10 px-6 md:py-8 md:px-[140px] gap-8 md:gap-8 rounded-xl">
          <H1 className="text-white text-2xl md:text-[34px] font-semibold">
            Select Project
          </H1>
          <div className="flex flex-col gap-4 items-center">
            {!data && !isLoading && (
              <Body1 className="text-white">No projects found</Body1>
            )}
            <div className="flex gap-1 items-center lg:w-[752px] w-full">
              <Body2 className="text-white font-semibold self-start flex">
                Now, select the project you would like to start with
              </Body2>
              {screenSize.width > 700 && (
                <Tooltip
                  iconHeight="16"
                  iconWidth="16"
                  content="If you don't see your team, the token is probably from another workspace. Change your workspace and try again."
                />
              )}
            </div>
            <div className="border overflow-y-scroll max-h-[160px] border-gray-300 py-2 rounded-[8px] max-w-[752px] w-full">
              {isLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-4 p-4 items-center">
                    <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
                      <Skeleton
                        width={14}
                        height={14}
                        circle
                        containerClassName="h-[14px]"
                      />
                      <Skeleton
                        width={
                          Math.random() * 130 +
                          (screenSize.width > 500 ? 200 : 50)
                        }
                        height={20}
                        containerClassName="h-[20px]"
                      />
                    </SkeletonTheme>
                  </div>
                ))}
              {data?.map((project: ProjectPreIntegrated) => (
                <div
                  key={project.providerProjectId}
                  className="flex items-center gap-4 p-4 hover:bg-gray-500 cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project)
                    handleSelection(project)
                  }}
                >
                  <RadioButton
                    handleChecked={() => {}}
                    id={project.providerProjectId}
                    selectedValue={selectedProject?.providerProjectId || ''}
                  />
                  {project.image && project.image !== '' ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-[20px] h-[20px] rounded-sm"
                    />
                  ) : (
                    <NoAvatarProject
                      text={project.name}
                      width={20}
                      height={20}
                    />
                  )}
                  <Body1 className="text-white">{project.name}</Body1>
                </div>
              ))}
            </div>
            {screenSize.width < 700 && (
              <HelperText className="text-white">
                If you don&apos;t see your team, the token is probably from
                another workspace. Change your workspace and try again.
              </HelperText>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SelectProject
