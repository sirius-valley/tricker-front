import axios from 'axios'

export const handleErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) return 'Unknown error'

  if (!error.response) return error.message

  return (error as { response: { data: { message: string } } }).response.data
    .message
}
