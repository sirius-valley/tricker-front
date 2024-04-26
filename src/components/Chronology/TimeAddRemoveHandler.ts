import { type IssueChronologyEventDTO } from '@utils/types'

function formatModificationTime(modificationTimeAmount: number): string {
  const absTime = Math.abs(modificationTimeAmount)

  const hours = Math.floor(absTime / 3600)
  const minutes = Math.floor((absTime % 3600) / 60)
  const seconds = absTime % 60

  let formattedTime = ''
  if (hours > 0) {
    formattedTime += `${hours} hour${hours !== 1 ? 's' : ''}`
  }
  if (minutes > 0) {
    if (formattedTime !== '') {
      formattedTime += ', '
    }
    formattedTime += `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }
  if (seconds > 0) {
    if (formattedTime !== '') {
      formattedTime += ', '
    }
    formattedTime += `${seconds} second${seconds !== 1 ? 's' : ''}`
  }

  if (formattedTime === '') {
    formattedTime = '0 seconds'
  }

  return formattedTime
}

function formatModificationDate(modificationDate: string): string {
  const date = new Date(modificationDate)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = String(date.getFullYear())

  return `${month}/${day}/${year}`
}

export const handleAddOrSubstractTime = (
  event: IssueChronologyEventDTO
): string => {
  let parsedData: string = ''
  let parsedTime: string = ''
  let action: string = ''

  if (event.modificationDate)
    parsedData = formatModificationDate(event.modificationDate)

  if (event.modificationTimeAmount) {
    parsedTime = formatModificationTime(event.modificationTimeAmount)
    action = event.modificationTimeAmount > 0 ? 'added' : 'substracted'
  }

  return `Manually ${action} ${parsedTime} on ${parsedData}. Reason: '${event.modificationReason}'`
}
