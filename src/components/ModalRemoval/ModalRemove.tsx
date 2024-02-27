import React from 'react'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import Icon from '@components/Icon/Icon'

export interface ModalRemoveProps {
  memberName: string
  projectName: string
  onRemove: () => void
  onClose: () => void
  show: boolean
}

const ModalRemove: React.FC<ModalRemoveProps> = ({
  memberName,
  projectName,
  onRemove,
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
        <div className="w-[400px] h-[400px] bg-white p-8 rounded-lg shadow-lg">
          <div>
          <h2 className="text-lg font-semibold mb-4">Remove Member</h2>
          <button 
          className='h-fit'
          onClick={()=> {
            onClose()
          }}
          >
            <Icon name="DismissIcon" />
          </button>
          </div>
          <p className="text-sm mb-4">
            Are you sure you want to remove {memberName} from {projectName}?
            This action cannot be undone.
          </p>
          <div className="flex">
            <Button
              variant="outline"
              size={'large'}
              onClick={()=>{
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              variant="error"
              size={'large'}
              onClick={()=>{
                onRemove()
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalRemove;
