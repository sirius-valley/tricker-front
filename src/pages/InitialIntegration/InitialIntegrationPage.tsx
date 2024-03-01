import StepNavigation, {
  StepType
} from '@components/NextBackButtons/NextBackButtons'
import { Stepper } from '@components/Stepper/Stepper'
import { useAppDispatch, useAppSelector, useSteps } from '@redux/hooks'
import { setCurrentStep } from '@redux/user'
import {
  type Step,
  type MemberPreIntegrated,
  type ProjectPreIntegrated
} from '@utils/types'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { ProjectAddition } from '@components/ProjectAddition/ProjectAddition'
import { useCallback, useState } from 'react'
import SelectProject from '@components/SelectProject/SelectProject'
import useScreenSize from '@hooks/useScreenSize'
import Icon from '@components/Icon/Icon'
import { TeamMemberManagement } from '@components/TeamMemberManagement/TeamMemberManagement'
import Button from '@components/Button/Button'
import { useNavigate } from 'react-router-dom'

const InitialIntegrationPage = (): JSX.Element => {
  const steps: Step[] = useSteps()
  const currentStep: number = useAppSelector((state) => state.user.currentStep)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
    }
  }
  const handleNextButton = (): void => {
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1))
    }
  }

  const [providerKey, setProviderKey] = useState<null | string>(null)
  const [provider, setProvider] = useState<null | string>(null)
  const [selectedProject, setSelectedProject] =
    useState<ProjectPreIntegrated | null>(null)
  const [teamMembers, setTeamMembers] = useState<null | MemberPreIntegrated[]>(
    null
  )

  const handleTeamMembers = useCallback((users: MemberPreIntegrated[]) => {
    setTeamMembers(users)
  }, [])

  return (
    <WrapperPage>
      {useScreenSize().width < 768 && (
        <button
          className="-rotate-90 top-[32px] absolute left-6 hover:bg-gray-500 rounded-full"
          onClick={handleBackButton}
        >
          <Icon name="CaretUpIcon" width="32" height="32" />
        </button>
      )}
      <div className="flex items-center flex-col justify-between h-screen md:h-fit gap-8 md:pt-0 pt-[100px] pb-6">
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
        {currentStep === 2 && selectedProject && (
          <TeamMemberManagement
            project={selectedProject}
            actualUser={{
              providerUserId: '',
              email: 'matiaspizzi@gmail.com',
              name: 'Matias Pizzi',
              profileImage: null
            }}
            handleRemainingUsers={handleTeamMembers}
          />
        )}
        <div className="flex gap-0 md:gap-6">
          <StepNavigation
            currentStep={stepType}
            onBack={handleBackButton}
            onNext={handleNextButton}
            showBackButton={useScreenSize().width >= 768}
            nextDisabled={
              (currentStep === 0 && (!providerKey || !provider)) ||
              (currentStep === 1 && !selectedProject)
            }
          ></StepNavigation>
          {stepType === StepType.LAST && (
            <Button
              variant="filled"
              className="w-[329px] h-fit md:w-[273px] text-black"
              onClick={() => {
                console.log({
                  key: providerKey,
                  project: selectedProject,
                  members: teamMembers
                })
              }}
            >
              Continue To Project
            </Button>
          )}
        </div>
      </div>
    </WrapperPage>
  )
}

export default InitialIntegrationPage
