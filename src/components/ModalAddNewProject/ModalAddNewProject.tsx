import React, { useCallback, useEffect, useState } from 'react'
import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import { usePostProjectIntegrationRequest } from '@data-provider/query'
import SelectProvider from './SelectProvider'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Spinner from '@components/Spinner/Spinner'
import SelectProject from './SelectProject'
import { type ProjectPreIntegrated } from '@utils/types'
import { setApiKey } from '@redux/user'

interface ModalAddNewProjectProps {
  onClose: () => void
  show: boolean
  variant: 'add' | 'remove'
}

const ModalAddNewProject: React.FC<ModalAddNewProjectProps> = ({
  onClose,
  show
}) => {
  const [step, setStep] = useState(0)
  const [projects, setProjects] = useState<ProjectPreIntegrated[]>([])
  const [apiKey, setApiKey] = useState<{ provider: string; value: string }>({
    provider: '',
    value: ''
  })

  return (
    <Modal
      show={show}
      onClose={() => {
        onClose()
      }}
    >
      {step === 1 && (
        <SelectProvider
          handleContinue={(data, provider, key) => {
            setStep(1)
            setProjects(data)
            setApiKey({ provider, value: key })
            console.log(data, provider, key)
          }}
          onClose={() => {
            onClose()
          }}
        />
      )}
      {step === 0 && (
        <SelectProject
          handleContinue={() => {
            setStep(2)
            console.log('continue')
          }}
          apiKey={apiKey}
          projects={projects}
          goBack={() => {
            setStep(0)
            console.log('back')
          }}
        />
      )}
    </Modal>
  )
}

export default ModalAddNewProject
