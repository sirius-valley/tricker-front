import { type Meta, type StoryObj } from '@storybook/react'
import TicketDisplay from './TicketDisplay'

const meta: Meta<typeof TicketDisplay> = {
  title: 'Components/TicketDisplay',
  component: TicketDisplay,
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

    priority: {
      defaultValue: 'feature',
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
    category: {
      defaultValue: 'urgent',
      control: {
        type: 'select'
      },
      options: ['feature', 'improvement', 'bug']
    },
    storyPoints: {
      defaultValue: 3,
      control: {
        type: 'number'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof TicketDisplay>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    ticketId: 'TKT-000',
    title: 'Ticket looooong name',
    priority: 'urgent',
    category: 'feature',
    storyPoints: 3
  },
  render: (args) => <TicketDisplay {...args} />
}
