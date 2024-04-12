import React from 'react'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import H2 from '@utils/typography/h2/h2'

export interface ModalConfirmProps {
  onContinue: () => void
  onClose: () => void
  title: string
  body?: string
  show: boolean
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  onContinue,
  onClose,
  title,
  body,
  show
}) => {
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
                  {title}
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
                {body}
              </Body2>
            </div>
            <div className="flex justify-center gap-6">
              <Button
                variant="outline"
                size={'large'}
                className="w-[225px] h-[50px]"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="error"
                size={'large'}
                className="w-[225px] h-[50px]"
                onClick={onContinue}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalConfirm
