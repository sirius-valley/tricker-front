import React, { useState } from 'react'
import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
import { Modal } from '@components/Modal/Modal'
import Button from '@components/Button/Button'

interface AddTimeProps {
  onClose: () => void
  show: boolean
}

const AddTimeModal: React.FC<AddTimeProps> = ({ onClose, show }) => {
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedReason, setSelectedReason] = useState<string>('')
  const [inputDate, setInputDate] = useState<string>('')
  const [isDateValid, setIsDateValid] = useState<boolean>(true)

  const times: string[] = [
    '10 minutes',
    '30 minutes',
    '45 minutes',
    '1 hour',
    '2 hours',
    '3 hours',
    '4 hours',
    '5 hours',
    '6 hours',
    '7 hours',
    '8 hours',
    '10 hours',
    '11 hours',
    '12 hours'
  ] // Opciones de tiempo
  const reasons: string[] = [
    'I forgot to track time',
    'Misestimated the task',
    'Internet connection issues',
    'Additional research required',
    'Technical issues',
    'Other unforeseen circumstances'
  ] // Opciones de motivos

  const handleSelectedTime = (time: string): void => {
    setSelectedTime(time)
  }

  const handleSelectedReason = (reason: string): void => {
    setSelectedReason(reason)
  }

  const handleInputDate = (value: string): void => {
    // Obtener la fecha actual
    const currentDate = new Date()

    // Obtener el año actual
    const currentYear = currentDate.getFullYear()

    // Validación de fecha (Año actual, días y meses válidos)
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/ // DD/MM/YYYY
    if (regex.test(value)) {
      const [, , yearString] = value.split('/')
      const year = parseInt(yearString, 10)

      // Validar si el año ingresado es igual al año actual y la fecha es igual o anterior a la actual
      if (year === currentYear) {
        // Revisar si se ha ingresado tanto el día como el mes, para agregar automáticamente la barra
        const [day, month] = value.split('/')
        let formattedDate = value

        if (day.length === 2 && !value.includes('/')) {
          formattedDate = `${day}/`
        } else if (month.length === 2 && value.indexOf('/') === 2) {
          formattedDate = `${value}`
        }

        setInputDate(formattedDate)

        // Crear un nuevo objeto Date para validar la fecha completa
        const inputDate = new Date(
          year,
          parseInt(month, 10) - 1,
          parseInt(day, 10)
        )
        const maxDaysInMonth = new Date(year, parseInt(month, 10), 0).getDate() // Obtener el número máximo de días en el mes

        if (inputDate <= currentDate && parseInt(day, 10) <= maxDaysInMonth) {
          setIsDateValid(true)
        } else {
          setIsDateValid(false)
        }
      } else {
        setIsDateValid(false)
      }
    } else {
      setIsDateValid(false)
    }
  }

  const handleAddTime = (): void => {
    // Lógica para agregar tiempo
    if (selectedTime && isDateValid) {
      // Lógica para guardar la entrada de tiempo
      console.log('Time added:', selectedTime)
      console.log('Date:', inputDate)
      console.log('Reason: ', selectedReason)
      onClose()
    } else {
      alert('Please fill the input field correctly')
    }
  }

  return (
    <Modal
      show={show}
      onClose={() => {
        onClose()
      }}
    >
      <div className="max-w-[539px] w-[92%] min-w-[310px] min-h-[199px] bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white">
        <div className="flex justify-between w-[100%]">
          <h5 className="font-normal mb-2" style={{ fontSize: '24px' }}>
            Add time manually
          </h5>
          <button className="hidden sm:block" onClick={onClose}>
            <Icon name="DismissIcon" />
          </button>
        </div>
        <Body2 className="text-sm font-normal mb-6">
          Forgot to track time in real-time? No worries! You can manually add
          the time you spent on this task.
        </Body2>
        <div className="flex flex-col w-full gap-4">
          <SelectInput
            handleSelectedOption={handleSelectedTime}
            options={times.map((time: string) => ({
              value: time,
              label: time
            }))}
            label="Amount of time"
            required
          />
          <Input
            label="Date"
            required
            handleValue={handleInputDate}
            placeholder="DD/MM/YYYY"
            variant={isDateValid ? 'default' : 'error'}
            helpertext={
              isDateValid
                ? 'Please enter a valid date'
                : 'Please enter a valid date from the current year'
            }
          />
          <SelectInput
            handleSelectedOption={handleSelectedReason}
            options={reasons.map((reason: string) => ({
              value: reason,
              label: reason
            }))}
            label="Reason"
            required
          />
        </div>
        <div className="flex justify-center mt-5 gap-6">
          <Button
            variant="outline"
            size={'large'}
            className="h-[56px] w-[313px]"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            size={'large'}
            className="h-[56px] w-[313px] text-black"
            onClick={handleAddTime}
          >
            Add Time
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddTimeModal
