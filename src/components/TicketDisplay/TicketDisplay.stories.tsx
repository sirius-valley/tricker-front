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
    variant: {
      description: 'The variant of the sidebar.',
      control: {
        type: 'select'
      },
      options: ['pm', 'dev']
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
    storyPoints: {
      defaultValue: 3,
      control: {
        type: 'number'
      }
    },
    pill: {
      defaultValue: 'Tracking',
      control: {
        type: 'select'
      },
      options: ['label', 'tracking', 'blocked']
    },
    description: {
      defaultValue:
        'Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci culpa delectus ipsum ipsa aliquam cum, soluta tenetur totam tempora quisquam velit quibusdam unde, necessitatibus at fuga. Facilis excepturi dolorem ut?',
      control: {
        type: 'text'
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
    variant: 'dev',
    priority: 'urgent',
    storyPoints: 3,
    pill: 'tracking',
    description:
      'Lorem ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci culpa delectus ipsum ipsa aliquam cum, soluta tenetur totam tempora quisquam velit quibusdam unde, necessitatibus at fuga. Facilis excepturi dolorem ut?'
  },
  render: (args) => <TicketDisplay {...args} />
}
