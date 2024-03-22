import { type Meta, type StoryObj } from '@storybook/react'
import TicketCard from './TicketCard'
import { Priority } from '@utils/types'

const meta: Meta<typeof TicketCard> = {
  title: 'Components/TicketCard',
  component: TicketCard,
  tags: ['autodocs'],
  argTypes: {
    ticketId: {
      defaultValue: 'TKT-000',
      control: {
        type: 'text'
      }
    },
    name: {
      defaultValue: 'Ticket looooong name',
      control: {
        type: 'text'
      }
    },
    status: {
      defaultValue: 'error',
      control: {
        type: 'select'
      },
      options: ['completed', 'tracking', 'blocked', null]
    },
    priority: {
      defaultValue: 'feature',
      control: {
        type: 'select'
      },
      options: [
        Priority.NO_PRIORITY,
        Priority.LOW_PRIORITY,
        Priority.MEDIUM_PRIORITY,
        Priority.HIGH_PRIORITY,
        Priority.URGENT
      ]
    },
    category: {
      defaultValue: 'urgent',
      control: {
        type: 'select'
      },
      options: ['feature', 'improvement', 'bug']
    },
    elapsedTime: {
      defaultValue: 200,
      control: {
        type: 'number'
      }
    },
    isProjectManager: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    associatedUserProfile: {
      defaultValue: '',
      control: {
        type: 'text'
      }
    },
    selectedCard: {
      defaultValue: false,
      control: {
        type: 'boolean'
      },
      description: 'It is true when the card is selected.'
    },
    storyPoints: {
      defaultValue: 3,
      control: {
        type: 'number'
      }
    },
    handleClick: {
      table: {
        type: {
          summary: 'function'
        }
      },
      description: 'Callback when the card is clicked to manage selected state.'
    }
  }
}

export default meta

type Story = StoryObj<typeof TicketCard>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    ticketId: 'TKT-000',
    name: 'Ticket looooong name',
    status: 'blocked',
    priority: Priority.URGENT,
    category: 'feature',
    elapsedTime: 200,
    isProjectManager: true,
    storyPoints: 3,
    associatedUserProfile:
      'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
  },
  render: (args) => <TicketCard {...args} />
}
