import ProjectDetails from '@components/ProjectDetails/ProjectDetails'
import MembersRoleManagement from '@components/MembersRoleManagement/MembersRoleManagement'
import { useGetProject } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { useEffect, useState } from 'react'
import useScreenSize from '@hooks/useScreenSize'
import { useSelectedProjectInfo, useAppDispatch, useUser } from '@redux/hooks'
import { Modal } from '@components/Modal/Modal'
import Body1 from '@utils/typography/body1/body1'
import { setSelectedProjectInfo } from '@redux/user'
import ProjectWrapper from '@components/ProjectWrapper/ProjectWrapper'
import HelperText from '@utils/typography/helpertext/helpertext'
import Button from '@components/Button/Button'
import ModalDeleteProject from '@components/ModalDeleteProject/ModalDeleteProject'
import { type UserProjectRole } from '@utils/types'

const ProjectsSection: React.FC = (): JSX.Element => {
  const project = useSelectedProjectInfo()

  const { data, isLoading, error } = useGetProject(project.id)
  const [userRole, setUserRole] = useState<string>('Developer')

  const user = useUser()

  useEffect(() => {
    const userProjectRole = user.projectsRoleAssigned.find(
      (userProjectRole: UserProjectRole) =>
        userProjectRole.projectId === project.id
    )
    setUserRole(userProjectRole?.role?.name || 'Developer')
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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
      <ModalDeleteProject
        onClose={() => {
          setShowDeleteModal(false)
        }}
        projectId={project.id}
        projectName={project.name}
        show={showDeleteModal}
      />
      <div className="max-w-[467px] w-[50%] xl:w-full">
        <ProjectWrapper />
      </div>
      {data?.name && !isLoading && (
        <div className="flex flex-col w-full md:w-full h-full pt-[60px] 2xl:p-16 p-8 self-end gap-10 overflow-y-auto overflow-x-hidden border-l border-gray-400">
          <ProjectDetails
            id={project.id}
            url={data.url}
            name={data.name}
            lastSync={new Date(data.updatedAt)}
            provider={data.issueProviderName}
            isProjectManager={userRole === 'Project Manager'}
          />
          <MembersRoleManagement
            members={data.users}
            projectId={project.id}
            projectName={data.name}
          />
          <div className="h-[140px] flex flex-col gap-8 pt-8 border-t border-gray-400">
            <div className="flex flex-col gap-1">
              <Body1>Delete Project</Body1>
              <HelperText>
                If you want to permanently delete this project and all of its
                data, you can do so below.
              </HelperText>
            </div>
            <Button
              onClick={() => {
                setShowDeleteModal(true)
              }}
              variant="error"
            >
              Delete Project
            </Button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="h-full w-full flex text-white">
      <ModalDeleteProject
        onClose={() => {
          setShowDeleteModal(false)
        }}
        projectId={project.id}
        projectName={project.name}
        show={showDeleteModal}
      />
      <ProjectWrapper />
      {data && !isLoading && (
        <Modal
          onClose={() => {
            deselectCurrentProject()
          }}
          show={project.id !== ''}
        >
          <div className="flex flex-col w-full h-full bg-gray-700 overflow-y-auto">
            <div className="w-full items-end min-h-[82px] justify-center flex flex-col">
              <button
                onClick={() => {
                  deselectCurrentProject()
                }}
              >
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
              {userRole === 'Project Manager' && (
                <button
                  onClick={() => {
                    setShowDeleteModal(true)
                  }}
                  className="items-end flex w-full justify-center h-full"
                >
                  <Body1 className="text-error-500 text-[16px] p-4">
                    Delete Project
                  </Body1>
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ProjectsSection
