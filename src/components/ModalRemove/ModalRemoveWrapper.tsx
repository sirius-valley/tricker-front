// import React, { useEffect } from 'react'
// import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import ModalRemove from './ModalRemove'

export interface ModalRemoveWrapperProps {
  memberName: string
  projectName: string
  onRemove: () => void
  onClose: () => void
  show: boolean
  isLoading?: boolean
}

const ModalRemoveWrapper: React.FC<ModalRemoveWrapperProps> = ({
  memberName,
  projectName
  //   onRemove,
  //   onClose,
  //   show,
  //   isLoading = false
}: ModalRemoveWrapperProps): JSX.Element => {
  // const { showSnackBar } = useSnackBar()
  // const { mutate, isPending, error, isSuccess } = useRemoveTeamMember()

  // useEffect(() => {
  //   if (error) {
  //     showSnackBar(error.message, 'error')
  //   }
  // }, [error])

  // useEffect(() => {
  //   if (isSuccess) {
  //     showSnackBar(`${memberName} has been removed successfully from this project`, 'success')
  //   }
  // }, [isSuccess])

  const handleRemoveTeamMember = (): void => {}

  // useEffect(() => {
  //   if (!isPending) onClose()
  // }, [isPending])
  return (
    <ModalRemove
      memberName={memberName}
      projectName={projectName}
      onRemove={handleRemoveTeamMember}
      onClose={() => {}}
      show={true}
    />
  )
}

export default ModalRemoveWrapper
