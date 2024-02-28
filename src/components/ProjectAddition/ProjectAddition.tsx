import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import { type Project } from '@utils/types'
import H2 from '@utils/typography/h2/h2'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'

interface ProjectAdditionProps extends React.HTMLAttributes<HTMLDivElement> {
  handleToken: (token: string) => void
  handleSelectedProject: (projectId: string) => void
  projects: Project[]
}

export const ProjectAddition: React.FC<ProjectAdditionProps> = ({
  handleToken,
  handleSelectedProject,
  projects
}): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center w-[320px] md:w-fit lg:w-[1048px] bg-gray-600 border border-primary-400 py-4 px-4 md:py-20 md:px-[140px] gap-10 rounded-xl">
      <div className="gap-2">
        <H2 className="text-white md:leading-[41.15px] text-[20px] md:text-[34px] whitespace-nowrap md:whitespace-normal font-semibold">
          Initial Setup
        </H2>
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full gap-4">
          <Subtitle className="text-white text-[14px] whitespace-pre-wrap md:text-base leading-[19.36px] text-bold">
            First, select the Project Management Tool
          </Subtitle>
          <div className="flex flex-col w-full gap-2">
            <SelectInput
              handleSelectedOption={handleSelectedProject}
              options={projects.map((project: Project) => ({
                value: project.id,
                label: project.name
              }))}
              label="Project Management Tool"
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <Subtitle className="text-white text-[14px] whitespace-pre-wrap md:text-base leading-[19.36px] text-bold">
            Second, add the user token to connect to the API
          </Subtitle>
          <Input
            handleValue={handleToken}
            label="User Token"
            required
            tooltip="You can find this under Team Settings > My Account > API > Personal Api Keys"
            className="md:h-[69px]"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          />
        </div>
      </div>
    </div>
  )
}
