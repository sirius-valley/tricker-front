import AddProject from '@components/AddProject/AddProject'
import React, { useState } from 'react'

interface ProjectWrapperProps {
  userRole: 'Project Manager' | 'Developer'
}

const ProjectWrapper: React.FC<ProjectWrapperProps> = ({
  userRole
}: ProjectWrapperProps): JSX.Element => {
  const [searchedProject, setSearchedProject] = useState<string>('')
  console.log(userRole, searchedProject)
  return (
    <div>
      <AddProject handleSearch={setSearchedProject} />
      {/* <MyProjectSelect searchedProject={searchedProject}/> */}
    </div>
  )
}

export default ProjectWrapper
