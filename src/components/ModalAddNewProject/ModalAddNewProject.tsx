import React, { useEffect, useState } from 'react'
import { Modal } from '@components/Modal/Modal'
import SelectProvider from './SelectProvider'
import SelectProject from './SelectProject'
import SelectMembers from './SelectMembers'
import {
  type AuthorizationRequest,
  type MemberPreIntegrated,
  type ProjectPreIntegrated
} from '@utils/types'
import { usePostProjectIntegrationRequest } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import { useUser } from '@redux/hooks'
import ModalWarning from '@components/ModalWarning/ModalWarning'

interface ModalAddNewProjectProps {
  onClose: () => void
  show: boolean
}

const ModalAddNewProject: React.FC<ModalAddNewProjectProps> = ({
  onClose,
  show
}) => {
  const [step, setStep] = useState(0)
  const [projects, setProjects] = useState<ProjectPreIntegrated[]>([])
  const [projectMembers, setProjectMembers] = useState<MemberPreIntegrated[]>(
    []
  )
  const [apiKey, setApiKey] = useState<{ provider: string; value: string }>({
    provider: '',
    value: ''
  })
  const [selectedProject, setSelectedProject] =
    useState<ProjectPreIntegrated | null>(null)
  const [showModalWarning, setShowModalWarning] = useState<boolean>(false)

  const { showSnackBar } = useSnackBar()
  const currentUser = useUser()

  const { mutate, isPending, error, isSuccess } =
    usePostProjectIntegrationRequest()

  useEffect(() => {
    if (isSuccess) {
      showSnackBar('We have send a request to integrate the project', 'success')
      onClose()
    }
    if (error) {
      showSnackBar('An error ocurred sending the integration request', 'error')
    }
  }, [isSuccess, error])

  const handleSubmit = (members: MemberPreIntegrated[]): void => {
    const actualUserProviderId = members.find(
      (member) => member.email === currentUser.email
    )?.providerId
    if (
      !apiKey.value ||
      !apiKey.provider ||
      !selectedProject ||
      !actualUserProviderId ||
      !members.length
    ) {
      showSnackBar(
        'It seems that we are missing some information. Please try again.',
        'error'
      )
      return
    }
    const request: AuthorizationRequest = {
      apiToken: apiKey.value,
      projectId: selectedProject.providerProjectId,
      integratorId: actualUserProviderId,
      members: members.map((member) => ({
        id: member.providerId,
        email: member.email
      })),
      organizationName:
        (import.meta.env.VITE_ORGANIZATION_NAME as string) || 'SIRIUS',
      issueProviderName: apiKey.provider
    }
    mutate({ provider: apiKey.provider, request })
  }

  return (
    <Modal
      show={show}
      onClose={() => {
        if (step === 0) {
          onClose()
        } else {
          setShowModalWarning(true)
        }
      }}
    >
      <ModalWarning
        show={showModalWarning}
        onClose={() => {
          setShowModalWarning(false)
        }}
        onContinue={() => {
          setShowModalWarning(false)
          setStep(0)
          onClose()
        }}
        title="Unsaved changes"
        body="You haven’t finished integrating this project to tricker. Are you sure you want to leave without finishing?"
      />
      {step === 0 && (
        <SelectProvider
          handleContinue={(data, provider, key) => {
            setStep(1)
            setProjects(data)
            setApiKey({ provider, value: key })
          }}
          onClose={() => {
            onClose()
          }}
        />
      )}
      {step === 1 && (
        <SelectProject
          handleContinue={(project, members) => {
            setSelectedProject(project)
            setProjectMembers(members)
            setStep(2)
          }}
          apiKey={apiKey}
          projects={projects}
          onClose={() => {
            setShowModalWarning(true)
          }}
          goBack={() => {
            setStep(0)
          }}
        />
      )}
      {step === 2 && selectedProject && (
        <SelectMembers
          apiKey={apiKey}
          project={selectedProject}
          members={projectMembers}
          isLoading={isPending}
          onClose={() => {
            setShowModalWarning(true)
          }}
          handleContinue={(members) => {
            handleSubmit(members)
          }}
          goBack={() => {
            setStep(1)
          }}
        />
      )}
    </Modal>
  )
}

export default ModalAddNewProject
