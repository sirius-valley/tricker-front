import '../../index.css'
import React, { useEffect, useState } from 'react'
import { Tooltip } from '@components/Tooltip/Tooltip'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import H1 from '@utils/typography/h1/h1'
import HelperText from '@utils/typography/helpertext/helpertext'
import RadioButton from '@components/RadioButton/RadioButton'
import { useGetPreIntegratedMembers } from '@data-provider/query'
import { type ProjectPreIntegrated } from '@utils/types'
import useScreenSize from '@hooks/useScreenSize'
import Spinner from '@components/Spinner/Spinner'
import 'react-loading-skeleton/dist/skeleton.css'
import Button from '@components/Button/Button'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'

export interface SelectProjectProps {
  handleContinue: () => void
  projects: ProjectPreIntegrated[]
  goBack: () => void
  apiKey: { provider: string; value: string }
}

const SelectProject: React.FC<SelectProjectProps> = ({
  projects,
  goBack,
  handleContinue,
  apiKey
}) => {
  const [enabled, setEnabled] = useState<boolean>(false)

  const { showSnackBar } = useSnackBar()

  const [selectedProject, setSelectedProject] =
    useState<ProjectPreIntegrated | null>(null)

  const { isLoading, refetch, data, error, isSuccess } =
    useGetPreIntegratedMembers(
      apiKey.value,
      selectedProject?.name || '',
      enabled
    )

  const screenSize = useScreenSize()

  const handleSelection = (project: ProjectPreIntegrated): void => {
    setSelectedProject(project)
    console.log(project)
  }

  const onContinue = (): void => {
    if (selectedProject) {
      setEnabled(true)
      refetch()
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data)
      showSnackBar('Projects fetched successfully', 'success')
      handleContinue()
    }
    if (error && !isSuccess) {
      setEnabled(false)
      showSnackBar("We couldn't fetch your projects", 'error')
    }
  }, [isSuccess, error, data, apiKey])

  return (
    <div className="max-w-[539px] w-[92%] min-w-[310px] h-fit bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white items-center">
      {isLoading ? (
        <div className="flex w-full min-h-[473px] items-center justify-center">
          <Spinner variant="primary" size={50} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-fit shadow-2 md:shadow-none gap-8 rounded-xl">
          <H1 className="text-white text-2xl md:text-[34px] font-semibold">
            {projects?.length !== 0 ? 'Select Project' : 'Upss!'}
          </H1>
          <div className="flex flex-col gap-4 items-center">
            {projects?.length === 0 && (
              <Body1 className="text-white text-[18px] leading-6 text-center">
                We couldn&apos;t find any projects to integrate with the
                provided API key.
              </Body1>
            )}
            {!isLoading && projects?.length !== 0 && (
              <>
                <div className="flex gap-1 items-center">
                  <Body2 className="text-white font-semibold self-start flex">
                    {/* Change this to not show it when there's no project found */}
                    Now, select the project you would like to start with
                  </Body2>
                  {screenSize.width > 700 && (
                    <Tooltip
                      iconHeight="16"
                      iconWidth="16"
                      content="If you don't see your team, the token is probably from another workspace. Change your workspace and try again."
                    />
                  )}
                </div>
                <div className="border overflow-y-scroll max-h-[233px] border-gray-300 py-2 rounded-[8px]">
                  {projects?.map((project: ProjectPreIntegrated) => (
                    <div
                      key={project.providerProjectId}
                      className="flex items-center gap-4 p-4 hover:bg-gray-500 cursor-pointer"
                      onClick={() => {
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
                        <NoAvatarProject
                          text={project.name}
                          width={20}
                          height={20}
                        />
                      )}
                      <Body1 className="text-white">{project.name}</Body1>
                    </div>
                  ))}
                </div>
              </>
            )}
            {screenSize.width < 700 && (
              <HelperText className="text-white">
                If you don&apos;t see your team, the token is probably from
                another workspace. Change your workspace and try again.
              </HelperText>
            )}
          </div>
          <div className="flex justify-center mt-5 gap-6">
            <Button
              variant="outline"
              size={'large'}
              className="h-[56px] w-[313px]"
              onClick={() => {
                goBack()
              }}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              size={'large'}
              className="h-[56px] w-[313px] text-black"
              onClick={onContinue}
              disabled={!apiKey.value || !apiKey.provider}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectProject
