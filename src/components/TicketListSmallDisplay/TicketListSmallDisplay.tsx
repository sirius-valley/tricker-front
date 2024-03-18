import React from 'react'
import { Priority } from '@utils/types'
import { useGetIssuesFilteredAndPaginated } from '@data-provider/query'
import { useUser } from '@redux/hooks'

const TicketListSmallDisplay: React.FC = (): JSX.Element => {
  const user = useUser()
  const selectedProjectId = '123' // later to be replaced with redux
  const filters = {
    priorities: [
      Priority.LOW_PRIORITY,
      Priority.MEDIUM_PRIORITY,
      Priority.HIGH_PRIORITY
    ]
  } // later to be replaced with redux

  const typeOrder: Record<string, number> = {
    Backlog: 1,
    Unstarted: 2,
    Started: 3,
    Completed: 4,
    Canceled: 5
  }

  const { data, error, isLoading } = useGetIssuesFilteredAndPaginated(
    user.id,
    selectedProjectId,
    filters
  )

  const sortedData = data?.sort(
    (a, b) => typeOrder[a.typeName] - typeOrder[b.typeName]
  )

  return <div className="w-[467px] h-[770px]"></div>
}

export default TicketListSmallDisplay
