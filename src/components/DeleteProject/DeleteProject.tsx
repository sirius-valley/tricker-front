import Button from '@components/Button/Button'
import Divider from '@components/Divider/Divider'
import ModalRemove from '@components/ModalRemove/ModalRemove'
import Body1 from '@utils/typography/body1/body1'
import { useState } from 'react'

const DeleteProject = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <div className="w-full flex flex-col gap-8">
      <Divider color="white/10" />
      <div className="w-fit flex flex-col gap-1">
        <Body1 className="text-white leading-[19.36px]">Delete Project</Body1>
        <Body1 className="text-xs text-white leading-[14.52px] text-wrap">
          If you want to permanently delete this project and all of its data,
          you can do so below
        </Body1>
      </div>
      <Button
        variant="error"
        onClick={() => {
          setShowModal(true)
        }}
      >
        Delete Project
      </Button>
      <ModalRemove
        memberName={'Federico'}
        projectName={'Tricker'}
        onRemove={() => {}}
        onClose={() => {
          setShowModal(false)
        }}
        show={showModal}
      />
    </div>
  )
}

export default DeleteProject
