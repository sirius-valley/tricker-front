import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import useScreenSize from '@hooks/useScreenSize'
import { type Screen, type Project } from '@utils/types'
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
  const screen: Screen = useScreenSize()
  return (
    <div className="flex flex-col items-center justify-center w-[329px] md:w-fit lg:w-[1048px] bg-gray-600 shadow-2 md:shadow-none border border-primary-400 py-10 px-6 md:py-20 md:px-[140px] gap-12 md:gap-10 rounded-xl">
      <div className="gap-2">
        <H2 className="text-white md:leading-[41.15px] text-[24px] md:text-[34px] whitespace-nowrap md:whitespace-normal font-semibold">
          Initial Setup
        </H2>
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full gap-4">
          <Subtitle className="text-white whitespace-pre-wrap md:text-base leading-[19.36px] text-semibold">
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
          <Subtitle className="text-white whitespace-pre-wrap md:text-base leading-[19.36px] text-semibold">
            Second, add the user token to connect to the API
          </Subtitle>
          <Input
            handleValue={handleToken}
            label="User Token"
            required
            tooltip={`${screen.width >= 768 ? 'You can find this under Team Settings > My Account > API > Personal Api Keys' : ''}`}
            helpertext={`${screen.width < 768 ? 'You can find this under Team Settings > My Account > API > Personal Api Keys' : ''}`}
            className="h-[69px]"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          />
        </div>
      </div>
    </div>
  )
}
