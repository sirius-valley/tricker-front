import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const MutationExample = (): React.ReactElement => {
  // useMutation receives a mutationFn and returns an object with isPending, isError, error, isSuccess, reset and mutate properties
  const { isPending, isError, error, isSuccess, reset, mutate } = useMutation({
    // reset is used to reset the state of isPending, isError, error and isSuccess
    mutationFn: async (data: Post) => {
      return await axios.post('apiUrl', data)
    }
  })

  return (
    <div>
      {isPending ? (
        'Adding todo...'
      ) : (
        <>
          {isError ? <div>An error occurred: {error.message}</div> : null}

          {isSuccess ? (
            <div>
              Data added successfully
              <button onClick={reset}>x</button>
            </div>
          ) : null}

          <button
            onClick={() => {
              mutate({ userId: 1, id: 1, title: 'title', body: 'body' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}
