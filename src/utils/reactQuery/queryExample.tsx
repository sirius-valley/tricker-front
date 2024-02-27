import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const PageExample = (): React.ReactElement => {
  // useQuery receives a queryKey and a function that returns a promise, and returns an object with isLoading, isError, data and error properties
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['example'],
    queryFn: async (): Promise<Post> => {
      // queryKey is a string that identifies the query, used for caching and refetching
      return await axios('https://jsonplaceholder.typicode.com/posts/1')
    }
  })

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>An error has occurred: {error.message}</div>

  if (!data) {
    return <div>No data</div>
  }

  return (
    <div>
      {data.title}
      {data.body}
      {data.userId}
    </div>
  )
}
