import AddProject from '@components/AddProject/AddProject'
import { MyProjectSelect } from '@components/MyProjectSelection/MyProjectSelection'
import React, { useState } from 'react'

const ProjectWrapper: React.FC = (): JSX.Element => {
  const [searchedProject, setSearchedProject] = useState<string>('')
  return (
    <div className="flex flex-col items-center">
      <AddProject handleSearch={setSearchedProject} />
      <MyProjectSelect searchedProject={searchedProject} />
    </div>
  )
}

export default ProjectWrapper
