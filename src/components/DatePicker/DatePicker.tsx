import { useEffect, useRef, useState } from 'react'
import Body2 from '@utils/typography/body2/body2'
import { DayPicker } from 'react-day-picker'
import Input from '@components/Input/Input'
import 'react-day-picker/dist/style.css'
import './DatePicker.css'

export interface DatePickerProps {
  label?: string
  required?: boolean
  helperText?: string
  toDate?: Date
  handleSelectedDate: (value: Date) => void
}

const DatePicker = ({
  label = '',
  required = false,
  handleSelectedDate,
  helperText,
  toDate
}: DatePickerProps): JSX.Element => {
  const today = new Date()
  const [selected, setSelected] = useState<Date>(today)
  const [show, setShow] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)

  const handleSelect = (date: Date | undefined): void => {
    if (date) {
      setSelected(date)
      handleSelectedDate(date)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        show &&
        ref.current !== null &&
        ref2.current !== null &&
        (!ref.current.contains(event.target as Node) ||
          ref2.current.contains(event.target as Node))
      ) {
        setShow(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [show])

  return (
    <div className="relative flex flex-col gap-2" ref={ref}>
      {label !== '' && (
        <div className="flex" ref={ref2}>
          <Body2 className="text-white flex text-sm leading-[16.94px] font-normal">
            {label}
          </Body2>
          {required && (
            <>
              &nbsp;
              <Body2 className="flex text-sm font-normal text-error-500">
                *
              </Body2>
            </>
          )}
        </div>
      )}
      <div className="absolute bottom-10 z-20">
        {show && (
          <DayPicker
            className="shadow-lg"
            showOutsideDays
            fixedWeeks
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            toDate={toDate}
          />
        )}
      </div>
      <div
        onClick={() => {
          setShow(!show)
        }}
      >
        <Input
          className="min-w-[300px]"
          readonly
          required
          helpertext={helperText}
          defaultValue={selected.toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
          handleValue={() => {}}
        />
      </div>
    </div>
  )
}

export default DatePicker
