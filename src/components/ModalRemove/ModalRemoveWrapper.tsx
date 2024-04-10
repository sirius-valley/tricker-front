import { useEffect } from 'react'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import ModalRemove from './ModalRemove'
import { useRemoveTeamMember } from '@data-provider/query'

export interface ModalRemoveWrapperProps {
  memberName: string
  memberId: string
  projectName: string
  projectId: string
  onClose: () => void
  show: boolean
}

const ModalRemoveWrapper: React.FC<ModalRemoveWrapperProps> = ({
  memberName,
  memberId,
  projectName,
  projectId,
  onClose,
  show
}: ModalRemoveWrapperProps): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const { mutate, isPending, error, isSuccess } = useRemoveTeamMember()

  useEffect(() => {
    if (error) {
      showSnackBar(error.message, 'error')
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      showSnackBar(
        `${memberName} has been removed successfully from this project`,
        'success'
      )
    }
  }, [isSuccess])

  const handleRemoveTeamMember = (): void => {
    if (!isPending) mutate({ projectId, userId: memberId })
  }

  useEffect(() => {
    if (!isPending) onClose()
  }, [isPending])
  return (
    <ModalRemove
      memberName={memberName}
      projectName={projectName}
      onRemove={handleRemoveTeamMember}
      onClose={() => {}}
      show={show}
    />
  )
}

export default ModalRemoveWrapper
