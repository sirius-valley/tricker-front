import StepNavigation, {
  StepType
} from '@components/NextBackButtons/NextBackButtons'
import { Stepper } from '@components/Stepper/Stepper'
import {
  useAppDispatch,
  useAppSelector,
  useSteps,
  useUser,
  useApiKey
} from '@redux/hooks'
import { setCurrentStep, setApiKey } from '@redux/user'
import {
  type Step,
  type MemberPreIntegrated,
  type ProjectPreIntegrated,
  type AuthorizationRequest,
  type User
} from '@utils/types'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { ProjectAddition } from '@components/ProjectAddition/ProjectAddition'
import { useCallback, useEffect, useState } from 'react'
import SelectProject from '@components/SelectProject/SelectProject'
import useScreenSize from '@hooks/useScreenSize'
import Icon from '@components/Icon/Icon'
import { TeamMemberManagement } from '@components/TeamMemberManagement/TeamMemberManagement'
import Button from '@components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { usePostProjectIntegrationRequest } from '@data-provider/query'
import { ProjectMail } from '@components/ProjectMail/ProjectMail'
import NotificationBadge from '@components/NotificationBadge/NotificationBadge'
import LoadingPage from '@pages/Loader/LoadingPage'

const InitialIntegrationPage = (): JSX.Element => {
  const steps: Step[] = useSteps()
  const apiKey = useApiKey()
  const currentStep: number = useAppSelector((state) => state.user.currentStep)
  const currentUser: User = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useUser()

  let stepType: StepType
  if (currentStep === 0) {
    stepType = StepType.FIRST
  } else if (currentStep === steps.length - 1) {
    stepType = StepType.LAST
  } else {
    stepType = StepType.MID
  }

  const handleBackButton = (): void => {
    if (currentStep === 0) {
      navigate('/login/role')
    }
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1))
      dispatch(setApiKey(apiKey))
    }
  }
  const handleNextButton = (): void => {
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1))
    }
  }

  const [providerKey, setProviderKey] = useState(apiKey.value || null)
  const [provider, setProvider] = useState<null | string>(null)
  const [selectedProject, setSelectedProject] =
    useState<ProjectPreIntegrated | null>(null)
  const [teamMembers, setTeamMembers] = useState<null | MemberPreIntegrated[]>(
    null
  )
  const [actualMemberProviderId, setActualMemberProviderId] =
    useState<string>('')

  const screenWidth = useScreenSize().width

  useEffect(() => {
    if (user.id === '') {
      navigate('/login')
    }
    const projectManager = teamMembers?.find(
      (user) => user.email === currentUser.email
    )
    if (projectManager) setActualMemberProviderId(projectManager.providerId)
  }, [user, teamMembers, navigate, currentUser, actualMemberProviderId])

  const handleTeamMembers = useCallback(
    (users: MemberPreIntegrated[]) => {
      setTeamMembers(users)
    },
    [setTeamMembers]
  )

  const { mutate, isPending, error, isSuccess } =
    usePostProjectIntegrationRequest()

  const handleSubmit = (): void => {
    if (!providerKey || !provider || !selectedProject || !teamMembers) return
    const request: AuthorizationRequest = {
      apiToken: providerKey,
      projectId: selectedProject.providerProjectId,
      integratorId: actualMemberProviderId,
      members: teamMembers.map((member) => ({
        id: member.providerId,
        email: member.email
      })),
      organizationName:
        (import.meta.env.VITE_ORGANIZATION_NAME as string) || 'SIRIUS',
      issueProviderName: provider
    }
    mutate({ provider, request })
  }

  return (
    <WrapperPage>
      {screenWidth < 768 && !isPending && !isSuccess && (
        <button
          className="-rotate-90 top-[32px] absolute left-6 hover:bg-gray-500 rounded-full"
          onClick={handleBackButton}
        >
          <Icon name="CaretUpIcon" width="32" height="32" />
        </button>
      )}
      {!isPending && !isSuccess && !error && (
        <div className="flex items-center flex-col justify-between md:h-fit gap-6 md:pt-0 pt-[100px] pb-3">
          <Stepper currentStep={currentStep} label={steps} />
          {currentStep === 0 && (
            <ProjectAddition
              providers={['Linear']}
              handleToken={(key) => {
                setProviderKey(key)
              }}
              handleSelectedProvider={(provider) => {
                setProvider(provider)
              }}
            />
          )}
          {currentStep === 1 && providerKey && provider && (
            <SelectProject
              providerKey={providerKey}
              provider={provider}
              handleSelection={(project: ProjectPreIntegrated) => {
                setSelectedProject(project)
              }}
            />
          )}
          {currentStep === 2 && selectedProject && providerKey && (
            <TeamMemberManagement
              project={selectedProject}
              apiKey={providerKey}
              actualUser={{ ...user, providerId: '' }}
              handleRemainingUsers={handleTeamMembers}
            />
          )}
          <div className="flex gap-0 md:gap-6">
            <StepNavigation
              currentStep={stepType}
              onBack={handleBackButton}
              onNext={handleNextButton}
              showBackButton={screenWidth >= 768}
              nextDisabled={
                (currentStep === 0 && (!providerKey || !provider)) ||
                (currentStep === 1 && !selectedProject)
              }
            ></StepNavigation>
            {stepType === StepType.LAST && (
              <Button
                variant="filled"
                className="w-[329px] h-fit md:w-[273px] text-black"
                onClick={handleSubmit}
              >
                Continue To Project
              </Button>
            )}
          </div>
        </div>
      )}
      {isPending && (
        <div>
          <LoadingPage />
        </div>
      )}
      {error && (
        <NotificationBadge
          variant="error"
          className="md:text-[15px] text-[13px]"
        >
          {
            'Error while trying to make the request. Please try again later or contact support'
          }
        </NotificationBadge>
      )}
      {screenWidth < 768 && (
        <button
          className="-rotate-90 top-[32px] absolute left-6 hover:bg-gray-500 rounded-full"
          onClick={handleBackButton}
        >
          <Icon name="CaretUpIcon" width="32" height="32" />
        </button>
      )}
      {isSuccess && selectedProject && (
        <ProjectMail projectName={selectedProject.name} />
      )}
    </WrapperPage>
  )
}

export default InitialIntegrationPage
