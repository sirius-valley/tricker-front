import AddProject from '@components/AddProject/AddProject'
import { ProjectList } from '@components/ProjectList/ProjectList'
import React, { useState } from 'react'

const ProjectWrapper: React.FC = (): JSX.Element => {
  const [searchedProject, setSearchedProject] = useState<string>('')
  return (
    <div className="flex flex-col items-center h-full w-full">
      <AddProject handleSearch={setSearchedProject} />
      <ProjectList searchedProject={searchedProject} />
    </div>
  )
}

export default ProjectWrapper
