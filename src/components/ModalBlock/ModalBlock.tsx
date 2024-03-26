import React, { useCallback, useEffect, useState } from 'react'
import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import { usePostBlock } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Spinner from '@components/Spinner/Spinner'
import { useCurrentTicket } from '@redux/hooks'

interface ModalBlockProps {
  onClose: () => void
  show: boolean
}

const ModalBlock: React.FC<ModalBlockProps> = ({ onClose, show }) => {
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [selectedComment, setSelectedComment] = useState<string>('')
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const currentTicket = useCurrentTicket()

  const blockReasons: string[] = [
    'Blocked by another ticket',
    'Blocked by external dependency',
    'Blocked by internal dependency',
    'Blocked by team member',
    'Blocked by client',
    'Other'
  ]

  const { mutate, reset, isPending, error, isSuccess } = usePostBlock()
  const { showSnackBar } = useSnackBar()

  const handleComment = (Comment: string): void => {
    setSelectedComment(Comment)
  }

  const handleSelectedReason = (reason: string): void => {
    setSelectedReason(reason)
  }

  const memoizedShowSnackBar = useCallback(showSnackBar, [showSnackBar])

  const setToInitialValues = (): void => {
    setSelectedReason('')
    setSelectedComment('')
  }

  useEffect(() => {
    if (
      selectedReason === '' ||
      (selectedReason === 'Other' && selectedComment === '')
    ) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
    if (isSuccess) {
      memoizedShowSnackBar('Ticket blocked successfully', 'success')
      setToInitialValues()
      reset()
      onClose()
    }
    if (error) {
      memoizedShowSnackBar(
        'An error occurred while blocking the ticket',
        'error'
      )
      setToInitialValues()
      reset()
    }
  }, [isSuccess, error, reset, memoizedShowSnackBar, onClose, selectedReason])

  const handleSubmitBlock = (): void => {
    if (selectedReason) {
      mutate({
        ticketId: currentTicket.id,
        reason: selectedReason,
        comment: selectedComment
      })
    }
  }

  return (
    <Modal
      show={show}
      onClose={() => {
        onClose()
        setToInitialValues()
      }}
    >
      <div className="max-w-[539px] w-[92%] min-w-[310px] min-h-[392px] bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white items-center">
        {isPending ? (
          <div className="flex w-full min-h-[392px] items-center justify-center">
            <Spinner variant="primary" size={50} />
          </div>
        ) : (
          <>
            <div className="flex justify-between w-[100%]">
              <h5 className="font-normal mb-2" style={{ fontSize: '24px' }}>
                Confirm Block
              </h5>
              <button className="hidden sm:block" onClick={onClose}>
                <Icon name="DismissIcon" />
              </button>
            </div>
            <Body2 className="text-sm font-normal mb-6">
              Are you sure you want to block this task? When blocked, time
              tracking for this ticket will pause until it&apos;s unblocked.
              Please provide a comment explaining the reason for the block.
            </Body2>
            <div className="flex flex-col w-full gap-4">
              <div className="z-10">
                <SelectInput
                  handleSelectedOption={handleSelectedReason}
                  options={blockReasons.map((reason: string) => ({
                    value: reason,
                    label: reason
                  }))}
                  label="Reason for Block"
                  required
                />
              </div>
              <Input
                label="Other reason or Clarifications"
                handleValue={handleComment}
                placeholder="Blocked by TIK-292"
                variant={'default'}
                required={selectedReason === 'Other'}
                helpertext={
                  selectedReason === 'Other' ? 'Please specify the reason' : ''
                }
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
                onClick={handleSubmitBlock}
                disabled={buttonDisabled}
              >
                Confirm Block
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default ModalBlock
