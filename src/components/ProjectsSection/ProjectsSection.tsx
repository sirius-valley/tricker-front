import ProjectDetails from '@components/ProjectDetails/ProjectDetails'
import MembersRoleManagement from '@components/MembersRoleManagement/MembersRoleManagement'
import { useGetProject } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { useEffect } from 'react'
export interface ProjectsSectionProps {
  projectId?: string
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projectId = '993f3f0f-3a09-4bbd-a716-948e0aed5935'
}): JSX.Element => {
  const { data, isLoading, error } = useGetProject(projectId)

  const { showSnackBar } = useSnackBar()

  useEffect(() => {
    if (error) {
      showSnackBar(
        'We had a problem loading the project info, please try again later',
        'error'
      )
    }
  }, [error, data])

  return (
    <div className="h-full w-full flex flex-col text-white">
      {data && !isLoading && (
        <div className="flex flex-col max-w-[800px] w-full pt-[60px] md:px-16 px-8 self-end gap-10 overflow-y-auto">
          <ProjectDetails
            id={projectId}
            url={data.url}
            name={data.name}
            lastSync={new Date(data.updatedAt)}
            provider={data.issueProviderName}
            isProjectManager={true}
          />
          <MembersRoleManagement
            members={data.users}
            projectId={projectId}
            projectName={data.name}
          />
        </div>
      )}
    </div>
  )
}

export default ProjectsSection
