import React from 'react'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'

export interface ModalUnblockProps {
  onUnblock: () => void
  onClose: () => void
  show: boolean
}

const ModalUnblock: React.FC<ModalUnblockProps> = ({
  onUnblock,
  onClose,
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
        <div className="max-w-[539px] w-[92%] min-w-[310px] min-h-[199px] bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white">
          <div className="flex justify-between w-[100%]">
            <h5 className="font-normal mb-2" style={{ fontSize: '24px' }}>
              Unblock Ticket
            </h5>
            <button
              className="h-fit hidden sm:block"
              onClick={() => {
                onClose()
              }}
            >
              <Icon name="DismissIcon" />
            </button>
          </div>
          <Body2 className="text-sm font-normal mb-5">
            Are you sure you want to unblock this ticket?
          </Body2>
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
              variant="filled"
              size={'large'}
              className="w-[225px] h-fit text-black"
              onClick={() => {
                onUnblock()
              }}
            >
              Confirm Unblock
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalUnblock
