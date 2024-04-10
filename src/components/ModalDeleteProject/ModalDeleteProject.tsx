import React, { useState } from 'react'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import H2 from '@utils/typography/h2/h2'
import Input from '@components/Input/Input'

export interface ModalDeleteProjectProps {
  projectName: string
  onRemove: () => void
  onClose: () => void
  show: boolean
}

const ModalDeleteProject: React.FC<ModalDeleteProjectProps> = ({
  projectName,
  onRemove,
  onClose,
  show
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  return (
    <>
      <Modal
        show={show}
        onClose={() => {
          onClose()
        }}
      >
        <div className="max-w-[539px] w-full min-w-[310px] min-h-[199px] bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white">
          <div className="flex flex-col justify-center w-full gap-6">
            <div className="flex flex-col justify-center w-full gap-2">
              <div className="flex justify-between w-full">
                <H2 className="font-medium text-[24px] leading-[29.05px]">
                  Delete {projectName}
                </H2>
                <button
                  className="h-fit hidden sm:block"
                  onClick={() => {
                    onClose()
                  }}
                >
                  <Icon name="DismissIcon" />
                </button>
              </div>

              <Body2 className="text-sm font-normal leading-[16.94px]">
                Are you sure you want to delete this project?
              </Body2>
            </div>
            <Input
              className="text-white"
              value={inputValue}
              variant="error"
              type="text"
              label={`To confirm, type "${projectName}" in the box below`}
              required
              handleValue={setInputValue}
            />
            <div className="flex justify-center gap-6">
              <Button
                variant="outline"
                size={'large'}
                className="w-[225px] h-fit"
                onClick={() => {
                  onClose()
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={inputValue !== projectName}
                variant="error"
                size={'large'}
                className="w-[225px] h-fit"
                onClick={() => {
                  onRemove()
                }}
              >
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalDeleteProject
