import '../../index.css'
import React, { useEffect, useState } from 'react'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import HelperText from '@utils/typography/helpertext/helpertext'
import RadioButton from '@components/RadioButton/RadioButton'
import { useGetPreIntegratedMembers } from '@data-provider/query'
import {
  type MemberPreIntegrated,
  type ProjectPreIntegrated
} from '@utils/types'
import Spinner from '@components/Spinner/Spinner'
import 'react-loading-skeleton/dist/skeleton.css'
import Button from '@components/Button/Button'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Icon from '@components/Icon/Icon'

export interface SelectProjectProps {
  handleContinue: (
    selectedProject: ProjectPreIntegrated,
    data: MemberPreIntegrated[]
  ) => void
  projects: ProjectPreIntegrated[]
  onClose: () => void
  goBack: () => void
  apiKey: { provider: string; value: string }
}

const SelectProject: React.FC<SelectProjectProps> = ({
  projects,
  goBack,
  onClose,
  handleContinue,
  apiKey
}) => {
  const [enabled, setEnabled] = useState<boolean>(false)

  const { showSnackBar } = useSnackBar()

  const [selectedProject, setSelectedProject] =
    useState<ProjectPreIntegrated | null>(null)

  const { isLoading, refetch, data, error, isSuccess } =
    useGetPreIntegratedMembers(
      selectedProject?.providerProjectId || '',
      apiKey.value,
      enabled
    )

  const handleSelection = (project: ProjectPreIntegrated): void => {
    setSelectedProject(project)
  }

  const onContinue = (): void => {
    if (selectedProject) {
      setEnabled(true)
      refetch()
    }
  }

  useEffect(() => {
    if (isSuccess && selectedProject && data) {
      setEnabled(false)
      handleContinue(selectedProject, data)
    }
    if (error && !isSuccess) {
      setEnabled(false)
      showSnackBar("We couldn't fetch the team members", 'error')
    }
  }, [isSuccess, error, data, apiKey])

  return (
    <div className="max-w-[539px] w-[92%] min-w-[310px] h-fit bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white items-center">
      {isLoading ? (
        <div className="flex w-full min-h-[350px] items-center justify-center">
          <Spinner variant="primary" size={50} />
        </div>
      ) : (
        <>
          <div className="flex justify-between w-[100%]">
            <h5 className="font-normal mb-2" style={{ fontSize: '24px' }}>
              Add New Project
            </h5>
            <button className="hidden sm:block" onClick={onClose}>
              <Icon name="DismissIcon" />
            </button>
          </div>
          {projects.length === 0 ? (
            <div className="flex w-full min-h-[180px] items-center justify-center">
              <Body1 className="text-white">
                You don&apos;t have any projects to add!
              </Body1>
            </div>
          ) : (
            <>
              <Body2 className="text-sm font-normal mb-6">
                Select the project you want to integrate with tricker
              </Body2>
              <div className="flex flex-col w-full gap-4">
                <div className="border overflow-y-scroll max-h-[233px] border-gray-300 py-2 rounded-[8px] max-w-[752px] w-full">
                  {projects?.map((project: ProjectPreIntegrated) => (
                    <div
                      key={project.providerProjectId}
                      className={`flex items-center gap-4 p-4 hover:bg-gray-500 ${project.alreadyIntegrated === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => {
                        if (project.alreadyIntegrated === true) return
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
                        <div className="min-w-5 min-h-5">
                          <NoAvatarProject
                            text={project.name}
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                      <div className="flex w-full justify-between items-center">
                        <Body1
                          className={`${project.alreadyIntegrated === true ? 'text-gray-300/80 ' : 'text-white '}`}
                        >
                          {project.name}
                        </Body1>
                        <HelperText className="text-gray-300/80">
                          {project.alreadyIntegrated === true ? 'Added' : ''}
                        </HelperText>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="flex justify-center mt-5 gap-6">
            <Button
              variant="outline"
              size={'large'}
              className="h-[56px] w-[313px]"
              onClick={goBack}
            >
              Back
            </Button>
            <Button
              variant="filled"
              size={'large'}
              className="h-[56px] w-[313px] text-black"
              onClick={onContinue}
              disabled={selectedProject === null}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default SelectProject
