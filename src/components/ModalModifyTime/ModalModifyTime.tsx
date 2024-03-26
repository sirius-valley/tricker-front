import React, { useCallback, useEffect, useState } from 'react'
import Input from '@components/Input/Input'
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

interface ModalModifyTimeProps {
  onClose: () => void
  show: boolean
  variant: 'add' | 'remove'
}

const ModalModifyTime: React.FC<ModalModifyTimeProps> = ({
  onClose,
  show,
  variant
}) => {
  const [selectedTime, setSelectedTime] = useState<number>(0)
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [inputDate, setInputDate] = useState<string>('')
  const [isDateValid, setIsDateValid] = useState<boolean>(true)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const currentTicket = useCurrentTicket()

  const timesInSeconds: Record<string, number> = {
    '10 minutes': 600,
    '30 minutes': 1800,
    '45 minutes': 2700,
    '1 hour': 3600,
    '2 hours': 7200,
    '3 hours': 10800,
    '4 hours': 14400,
    '5 hours': 18000,
    '6 hours': 21600,
    '7 hours': 25200,
    '8 hours': 28800,
    '10 hours': 36000,
    '11 hours': 39600,
    '12 hours': 43200
  }

  const addReasons: string[] = [
    'I forgot to track time',
    'Misestimated the task',
    'Internet connection issues',
    'Additional research required',
    'Technical issues',
    'Other unforeseen circumstances'
  ]

  const subtractReasons: string[] = [
    'I forgot to stop tracking time',
    'Misestimated the task',
    'Internet connection issues',
    'Technical issues',
    'Other unforeseen circumstances'
  ]

  const { mutate, reset, isPending, error, isSuccess } = usePostModifyTime()
  const { showSnackBar } = useSnackBar()

  const handleSelectedTime = (time: string): void => {
    setSelectedTime(timesInSeconds[time])
  }

  const handleSelectedReason = (reason: string): void => {
    setSelectedReason(reason)
  }

  const handleInputDate = (value: string): void => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/ // DD/MM/YYYY
    if (regex.test(value)) {
      const [, , yearString] = value.split('/')
      const year = parseInt(yearString, 10)

      if (year === currentYear) {
        const [day, month] = value.split('/')
        let formattedDate = value

        if (day.length === 2 && !value.includes('/')) {
          formattedDate = `${day}/`
        } else if (month.length === 2 && value.indexOf('/') === 2) {
          formattedDate = `${value}`
        }

        setInputDate(formattedDate)

        const inputDate = new Date(
          year,
          parseInt(month, 10) - 1,
          parseInt(day, 10)
        )
        const maxDaysInMonth = new Date(year, parseInt(month, 10), 0).getDate()

        if (inputDate <= currentDate && parseInt(day, 10) <= maxDaysInMonth) {
          setIsDateValid(true)
          return
        }
      }
    }
    setIsDateValid(false)
  }

  const memoizedShowSnackBar = useCallback(showSnackBar, [showSnackBar])

  const setToInitialValues = (): void => {
    setInputDate('')
    setSelectedTime(0)
    setSelectedReason('')
    setIsDateValid(true)
  }

  useEffect(() => {
    if (selectedTime === 0 || selectedReason === '' || inputDate === '') {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
    if (isSuccess) {
      memoizedShowSnackBar('Time change submitted successfully', 'success')
      setToInitialValues()
      reset()
      onClose()
    }
    if (error) {
      memoizedShowSnackBar(
        'An error occurred while submitting the time',
        'error'
      )
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

  const parseDateToISOString = (date: string): string => {
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}T12:00:00Z`
  }

  const handleSubmitTime = (): void => {
    if (selectedTime && isDateValid) {
      const data: ModifyTimeData = {
        timeAmount: selectedTime,
        reason: selectedReason,
        date: parseDateToISOString(inputDate)
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
                  options={Object.keys(timesInSeconds).map((time: string) => ({
                    value: time,
                    label: time
                  }))}
                  label="Amount of time"
                  required
                />
              </div>
              <Input
                label="Date"
                required
                handleValue={handleInputDate}
                placeholder="DD/MM/YYYY"
                variant={isDateValid ? 'default' : 'error'}
                helpertext={
                  isDateValid
                    ? ''
                    : 'Please enter a valid date from the current year'
                }
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
