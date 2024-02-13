import { type Meta, type StoryObj } from '@storybook/react'
import TicketCard from './TicketCard'

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
    title: {
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
      options: ['default', 'gradient', 'error']
    },
    priority: {
      defaultValue: 'feature',
      control: {
        type: 'select'
      },
      options: ['feature', 'improvement', 'bug']
    },
    category: {
      defaultValue: 'urgent',
      control: {
        type: 'select'
      },
      options: [
        'no-priority',
        'low-priority',
        'medium-priority',
        'high-priority',
        'urgent'
      ]
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
    }
  }
}

export default meta

type Story = StoryObj<typeof TicketCard>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    ticketId: 'TKT-000',
    title: 'Ticket looooong name',
    status: 'error',
    priority: 'feature',
    category: 'urgent',
    elapsedTime: 200,
    isProjectManager: true,
    associatedUserProfile:
      'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
  },
  render: (args) => <TicketCard {...args} />
}
