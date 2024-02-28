import '../../index.css'
import React, { useState } from 'react'
import { Tooltip } from '@components/Tooltip/Tooltip'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import H1 from '@utils/typography/h1/h1'
import RadioButton from '@components/RadioButton/RadioButton'
import { useGetProjects } from '@data-provider/query'

export interface SelectProjectScreenProps {
  handleSelection: (id: string) => void
}

const SelectProjectScreen: React.FC<SelectProjectScreenProps> = ({
  handleSelection
}) => {
  const { data, isLoading, error } = useGetProjects()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <div className="flex flex-col max-w-[1032px] min-h-[500px] border border-primary-400 rounded-xl justify-center items-center bg-gray-600">
      <H1 className="text-white">Select Project</H1>
      <div className="flex flex-col gap-4 items-center w-full p-6">
        <div className="flex gap-1 items-center max-w-[752px] w-full">
          <Body2 className="text-white font-semibold self-start flex">
            Now, select the project you would like to start with
          </Body2>
          <Tooltip
            iconHeight="16"
            iconWidth="16"
            content="If you don't see your team, the token is probably from another workspace. Change your workspace and try again."
          />
        </div>
        <div className="border border-gray-300 py-2 rounded-[8px] max-w-[752px] w-full">
          {data?.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                setSelectedProject(project.id)
                handleSelection(project.id)
              }}
            >
              <RadioButton
                handleChecked={() => {}}
                id={project.id}
                selectedValue={selectedProject || ''}
              />
              {project.image && project.image !== '' ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-[20px] h-[20px] rounded-sm"
                />
              ) : (
                <NoAvatarProject text={project.name} />
              )}
              <Body1 className="text-white">{project.name}</Body1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectProjectScreen
