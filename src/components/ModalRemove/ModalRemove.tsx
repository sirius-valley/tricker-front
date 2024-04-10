import React from 'react'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import Spinner from '@components/Spinner/Spinner'

export interface ModalRemoveProps {
  memberName: string
  projectName: string
  onRemove: () => void
  onClose: () => void
  show: boolean
  isLoading?: boolean
}

const ModalRemove: React.FC<ModalRemoveProps> = ({
  memberName,
  projectName,
  onRemove,
  onClose,
  show,
  isLoading = false
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
              Remove Member
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
            Are you sure you want to remove {memberName} from {projectName}? If
            you change your mind, you can grant them access later.
          </Body2>
          <div className="flex justify-center gap-6">
            <Button
              variant="outline"
              size={'large'}
              className="w-[225px] h-[50px]"
              onClick={() => {
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              variant="error"
              size={'large'}
              className="w-[225px] h-[50px]"
              onClick={() => {
                onRemove()
              }}
            >
              {isLoading ? <Spinner variant={'white'} size={22} /> : 'Remove'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalRemove
