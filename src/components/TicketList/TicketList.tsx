import { useState, useEffect } from 'react'

export interface TicketListProps {
  ticketId: string
  title?: string
  status?: 'label' | 'tracking' | 'blocked'
  category?: 'feature' | 'improvement' | 'bug'
  priority?:
    | 'no-priority'
    | 'low-priority'
    | 'medium-priority'
    | 'high-priority'
    | 'urgent'
  elapsedTime?: number
  isProjectManager?: boolean
  associatedUserProfile: string
  selectedCard: boolean
  storyPoints: number
  handleClick: () => void
}

const TicketList: React.FC<TicketListProps> = ({}): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState([])
  const [activeTicketId, setActiveTicketId] = useState(null)

  useEffect(() => {
    // Simulating fetching user-specific tickets from backend
    const fetchUserTickets = async () => {
      try {
        // Assuming fetchUserTickets() returns an array of ticket objects
        const fetchedTickets = await fetchUserTickets()
        // setTickets(fetchedTickets)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching tickets:', error)
        setLoading(false)
      }
    }

    fetchUserTickets()
  }, [])

  return (
    <div className="ticket-component">
      {loading ? (
        // Skeleton screens while loading
        <div className="skeleton-ticket">
          <div className="skeleton-ticket-header"></div>
          <div className="skeleton-ticket-details"></div>
        </div>
      ) : (
        // Display tickets
        <>
          <div className="ticket-column">
            <h2>To Do</h2>
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket ${activeTicketId === ticket.id ? 'active-ticket' : ''}`}
                onClick={() => {
                  setActiveTicketId(ticket.id)
                }}
              >
                <div className="ticket-header">{ticket.title}</div>
                <div className="ticket-details">{ticket.description}</div>
              </div>
            ))}
          </div>
          {/* Add other columns like 'In Progress', 'Done', etc. */}
        </>
      )}
    </div>
  )
}

export default TicketList
