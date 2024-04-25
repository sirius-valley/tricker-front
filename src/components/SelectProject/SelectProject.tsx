import '../../index.css'
import React, { useState } from 'react'
import { Tooltip } from '@components/Tooltip/Tooltip'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import H1 from '@utils/typography/h1/h1'
import HelperText from '@utils/typography/helpertext/helpertext'
import RadioButton from '@components/RadioButton/RadioButton'
import { type ProjectPreIntegrated } from '@utils/types'
import useScreenSize from '@hooks/useScreenSize'
import 'react-loading-skeleton/dist/skeleton.css'

export interface SelectProjectProps {
  handleSelection: (project: ProjectPreIntegrated) => void
  projects: ProjectPreIntegrated[]
}

const SelectProject: React.FC<SelectProjectProps> = ({
  handleSelection,
  projects
}) => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectPreIntegrated | null>(null)
  const screenSize = useScreenSize()

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-8 lg:h-[425px] md:w-fit lg:w-[1032px] bg-gray-600 shadow-2 md:shadow-none border border-primary-400 py-10 px-6 md:py-20 md:px-[140px] gap-8 md:gap-10 rounded-xl">
        <H1 className="text-white text-2xl md:text-[34px] font-semibold">
          {projects.length !== 0 ? 'Select Project' : 'Upss!'}
        </H1>
        <div className="flex flex-col gap-4 items-center">
          {projects.length === 0 && (
            <Body1 className="text-white text-[18px] leading-6 text-center">
              We couldn&apos;t find any projects to integrate with the provided
              API key.
            </Body1>
          )}
          {projects.length !== 0 && (
            <>
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
              <div className="border overflow-y-scroll max-h-[233px] border-gray-300 py-2 rounded-[8px] max-w-[752px] w-full">
                {projects.map((project: ProjectPreIntegrated) => (
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
            </>
          )}
          {screenSize.width < 700 && projects.length > 0 && (
            <HelperText className="text-white">
              If you don&apos;t see your team, the token is probably from
              another workspace. Change your workspace and try again.
            </HelperText>
          )}
        </div>
      </div>
    </>
  )
}

export default SelectProject
