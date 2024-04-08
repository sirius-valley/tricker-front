import React, { useState } from 'react'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import H2 from '@utils/typography/h2/h2'

export interface ModalRefreshProjectProps {
  handleRefresh: () => void
  onClose: () => void
  show: boolean
}

const ModalRefreshProject: React.FC<ModalRefreshProjectProps> = ({
  handleRefresh,
  onClose,
  show
}: ModalRefreshProjectProps) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [provider, setProvider] = useState<string>('')
  console.log(inputValue, provider)
  return (
    <>
      <Modal
        show={show}
        onClose={() => {
          onClose()
        }}
      >
        <div className="max-w-[539px] w-[92%] min-w-[310px] min-h-[199px] bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white">
          <div className="flex flex-col justify-center w-full gap-8">
            <div className="flex flex-col w-full gap-2">
              <div className="flex justify-between w-full">
                <H2 className="font-normal text-[24px]">Refresh Project</H2>
                <button
                  className="h-fit hidden sm:block"
                  onClick={() => {
                    onClose()
                  }}
                >
                  <Icon name="DismissIcon" />
                </button>
              </div>
              <Body2 className="text-sm font-normal">
                Please add the User Token here so we can refresh the project.
                You can find the User Token under Team Settings &gt; My Account
                &gt; API &gt; Personal Api Keys
              </Body2>
            </div>
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col w-full gap-2">
                <SelectInput
                  handleSelectedOption={(provider) => {
                    setProvider(provider)
                  }}
                  options={[
                    {
                      value: 'Linear',
                      label: 'Linear'
                    }
                  ]}
                  label="Project Management Tool"
                />
              </div>
              <div className="flex flex-col w-full gap-4">
                <Input
                  handleValue={setInputValue}
                  label="User Token"
                  className="h-10 md:h-[69px]"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                />
              </div>
              <div className="flex justify-center gap-6">
                <Button
                  variant="filled"
                  size={'large'}
                  className="w-full h-fit text-black"
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalRefreshProject
