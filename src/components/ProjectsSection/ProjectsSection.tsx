import ProjectDetails from '@components/ProjectDetails/ProjectDetails'
import MembersRoleManagement from '@components/MembersRoleManagement/MembersRoleManagement'
import { useGetProject } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { useEffect } from 'react'
import useScreenSize from '@hooks/useScreenSize'
import { MyProjectSelect } from '@components/MyProjectSelection/MyProjectSelection'
import { useSelectedProjectInfo, useAppDispatch } from '@redux/hooks'
import { Modal } from '@components/Modal/Modal'
import Body1 from '@utils/typography/body1/body1'
import { setSelectedProjectInfo } from '@redux/user'
import ProjectWrapper from '@components/ProjectWrapper/ProjectWrapper'

const ProjectsSection: React.FC = (): JSX.Element => {
  const project = useSelectedProjectInfo()

  const { data, isLoading, error } = useGetProject(project.id)

  const dispatch = useAppDispatch()
  const screen = useScreenSize()
  const { showSnackBar } = useSnackBar()

  useEffect(() => {
    if (error) {
      showSnackBar(
        'We had a problem loading the project info, please try again later',
        'error'
      )
    }
  }, [error, data])

  const deselectCurrentProject = (): void => {
    dispatch(
      setSelectedProjectInfo({
        id: '',
        name: '',
        image: ''
      })
    )
  }

  return screen.width >= 768 ? (
    <div className="h-full w-full flex text-white">
      <ProjectWrapper />
      {data && !isLoading && (
        <div className="flex flex-col w-full h-full pt-[60px] 2xl:px-16 px-8 self-end gap-10 overflow-y-auto overflow-x-hidden border-l border-gray-400">
          <ProjectDetails
            id={project.id}
            url={data.url}
            name={data.name}
            lastSync={new Date(data.updatedAt)}
            provider={data.issueProviderName}
            isProjectManager={true}
          />
          <MembersRoleManagement
            members={data.users}
            projectId={project.id}
            projectName={data.name}
          />
        </div>
      )}
    </div>
  ) : (
    <div className="h-full w-full flex text-white">
      <ProjectWrapper />
      {data && !isLoading && (
        <Modal onClose={deselectCurrentProject} show={project.id !== ''}>
          <div className="flex flex-col w-full h-full bg-gray-700 overflow-y-auto">
            <div className="w-full items-end min-h-[82px] justify-center flex flex-col">
              <button onClick={deselectCurrentProject}>
                <Body1 className="text-primary-400 text-[16px] p-4">
                  Close
                </Body1>
              </button>
            </div>
            <div className="w-full h-full flex flex-col gap-6 px-8 pb-8">
              <ProjectDetails
                id={project.id}
                url={data.url}
                name={data.name}
                lastSync={new Date(data.updatedAt)}
                provider={data.issueProviderName}
                isProjectManager={true}
              />
              <MembersRoleManagement
                members={data.users}
                projectId={project.id}
                projectName={data.name}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ProjectsSection

