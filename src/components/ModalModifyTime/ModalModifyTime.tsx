import React, { useCallback, useEffect, useState } from 'react'
import SelectInput from '@components/SelectInput/SelectInput'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'
import { type ModifyTimeData } from '@utils/types'
import { usePostModifyTime } from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Spinner from '@components/Spinner/Spinner'
import { useCurrentTicket } from '@redux/hooks'
import DatePicker from '@components/DatePicker/DatePicker'
import { addReasons, subtractReasons, timesInSeconds } from './Constants'
import { handleErrorMessage } from '@data-provider/AxiosError'

interface ModalModifyTimeProps {
  onClose: () => void
  show: boolean
  variant: 'add' | 'remove'
  refetchTime: () => void
  elapsedTime: number
}

const ModalModifyTime: React.FC<ModalModifyTimeProps> = ({
  onClose,
  show,
  variant,
  refetchTime,
  elapsedTime
}) => {
  const [selectedTime, setSelectedTime] = useState<number>(0)
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [inputDate, setInputDate] = useState<Date>(new Date())
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const currentTicket = useCurrentTicket()

  const { mutate, reset, isPending, error, isSuccess } = usePostModifyTime()
  const { showSnackBar } = useSnackBar()

  const handleSelectedTime = (time: string): void => {
    setSelectedTime(timesInSeconds[time])
  }

  const handleSelectedReason = (reason: string): void => {
    setSelectedReason(reason)
  }

  const handleSelectedDate = (date: Date): void => {
    setInputDate(date)
  }

  const memoizedShowSnackBar = useCallback(showSnackBar, [showSnackBar])

  const setToInitialValues = (): void => {
    setSelectedTime(0)
    setSelectedReason('')
  }

  useEffect(() => {
    setToInitialValues()
  }, [show])

  useEffect(() => {
    if (selectedTime === 0 || selectedReason === '' || inputDate === null) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
    if (isSuccess) {
      memoizedShowSnackBar('Time change submitted successfully', 'success')
      setToInitialValues()
      refetchTime()
      reset()
      onClose()
    }
    if (error) {
      memoizedShowSnackBar(handleErrorMessage(error), 'error')
      setToInitialValues()
      reset()
    }
  }, [
    isSuccess,
    error,
    reset,
    memoizedShowSnackBar,
    onClose,
    selectedTime,
    selectedReason,
    inputDate
  ])

  const handleSubmitTime = (): void => {
    if (selectedTime && selectedReason) {
      const data: ModifyTimeData = {
        timeAmount: selectedTime,
        reason: selectedReason,
        date: inputDate.toISOString()
      }

      mutate({ ticketId: currentTicket.id, data, variant })
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
      <div className="max-w-[539px] w-[92%] min-w-[310px] min-h-[473px] bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white items-center">
        {isPending ? (
          <div className="flex w-full min-h-[473px] items-center justify-center">
            <Spinner variant="primary" size={50} />
          </div>
        ) : (
          <>
            <div className="flex justify-between w-[100%]">
              <h5 className="font-normal mb-2" style={{ fontSize: '24px' }}>
                {`${variant[0].toUpperCase() + variant.substring(1)} time manually`}
              </h5>
              <button className="hidden sm:block" onClick={onClose}>
                <Icon name="DismissIcon" />
              </button>
            </div>
            {variant === 'add' ? (
              <Body2 className="text-sm font-normal mb-6">
                Forgot to track time in real-time? No worries! You can manually
                add the time you spent on this task.
              </Body2>
            ) : (
              <Body2 className="text-sm font-normal mb-6">
                Forgot to stop tracking time? No worries! You can manually
                subtract time from this ticket to accurately reflect your work.
              </Body2>
            )}
            <div className="flex flex-col w-full gap-4">
              <div className="z-10">
                <SelectInput
                  handleSelectedOption={handleSelectedTime}
                  options={
                    variant === 'add'
                      ? Object.keys(timesInSeconds).map((time: string) => ({
                          value: time,
                          label: time
                        }))
                      : Object.entries(timesInSeconds)
                          .filter(([_, value]) => value <= elapsedTime)
                          .map(([time, _]) => ({
                            value: time,
                            label: time
                          }))
                  }
                  label="Amount of time"
                  required
                />
              </div>
              <DatePicker
                label="Date"
                required
                handleSelectedDate={handleSelectedDate}
                toDate={new Date()}
              />
              <SelectInput
                handleSelectedOption={handleSelectedReason}
                options={
                  variant === 'add'
                    ? addReasons.map((reason: string) => ({
                        value: reason,
                        label: reason
                      }))
                    : subtractReasons.map((reason: string) => ({
                        value: reason,
                        label: reason
                      }))
                }
                label="Reason"
                required
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
                onClick={handleSubmitTime}
                disabled={buttonDisabled}
              >
                {variant[0].toUpperCase() + variant.substring(1)} Time
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default ModalModifyTime
