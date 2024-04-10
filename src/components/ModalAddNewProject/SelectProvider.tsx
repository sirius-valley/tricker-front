import React, { useEffect, useState } from 'react'
import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import Button from '@components/Button/Button'
import { useGetPreIntegratedProjects } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Spinner from '@components/Spinner/Spinner'
import { type ProjectPreIntegrated } from '@utils/types'

interface SelectProviderProps {
  handleContinue: (
    data: ProjectPreIntegrated[],
    provider: string,
    apiKey: string
  ) => void
  onClose: () => void
}

const SelectProvider: React.FC<SelectProviderProps> = ({
  handleContinue,
  onClose
}) => {
  const [provider, setProvider] = useState<null | string>(null)
  const [apiKey, setApiKey] = useState<null | string>(null)
  const [isApiValid, setIsApiValid] = useState<boolean>(true)
  const [enabled, setEnabled] = useState<boolean>(false)

  const { showSnackBar } = useSnackBar()

  const { isLoading, refetch, data, error, isSuccess } =
    useGetPreIntegratedProjects(apiKey || '', provider || '', enabled)

  const handleSelectedProvider = (value: string): void => {
    setProvider(value)
  }

  const handleApiKey = (value: string): void => {
    setApiKey(value)
  }

  const setToInitialValues = (): void => {
    setProvider(null)
    setIsApiValid(true)
    setApiKey(null)
  }

  const onContinue = (): void => {
    if (apiKey && provider) {
      setEnabled(true)
      refetch()
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data)
      showSnackBar('Projects fetched successfully', 'success')
      handleContinue(data, provider || '', apiKey || '')
    }
    if (error && !isSuccess) {
      setEnabled(false)
      showSnackBar("We couldn't fetch your projects", 'error')
    }
  }, [isSuccess, error, data, provider, apiKey])

  return (
    <div className="max-w-[539px] w-[92%] min-w-[310px] h-fit bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white items-center">
      {isLoading ? (
        <div className="flex w-full min-h-[473px] items-center justify-center">
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
          <Body2 className="text-sm font-normal mb-6">
            Add the User Token to connect to the API, then select the project
            you want to add
          </Body2>
          <div className="flex flex-col w-full gap-4">
            <div className="z-10">
              <SelectInput
                handleSelectedOption={handleSelectedProvider}
                options={[{ label: 'Linear', value: 'Linear' }]}
                label="Project Management Tool"
                required
              />
            </div>
            <Input
              label="API Key"
              required
              handleValue={handleApiKey}
              placeholder=""
              variant={
                provider ? (isApiValid ? 'default' : 'error') : 'default'
              }
              helpertext={isApiValid ? '' : 'Please enter a valid API key'}
            />
          </div>
          <div className="flex justify-center mt-5 gap-6">
            <Button
              variant="outline"
              size={'large'}
              className="h-[56px] w-[313px]"
              onClick={() => {
                onClose()
                setToInitialValues()
              }}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              size={'large'}
              className="h-[56px] w-[313px] text-black"
              onClick={onContinue}
              disabled={!apiKey || !provider}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default SelectProvider
