import { type Meta, type StoryObj } from '@storybook/react'
import TimeTrackingBadge from './TimeTrackingBadge'

const meta: Meta<typeof TimeTrackingBadge> = {
  title: 'Components/TimeTrackingBadge',
  component: TimeTrackingBadge,
  tags: ['autodocs'],
  argTypes: {
    ticketId: {
      defaultValue: 'TKT-000',
      control: {
        type: 'text'
      }
    },
    handleElapsedTime: {
      table: {
        type: {
          summary: 'function'
        }
      },
      description:
        'Callback that retrieves the elapsed time since it was paused.'
    }
  }
}

export default meta

type Story = StoryObj<typeof TimeTrackingBadge>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    ticketId: 'TKT-000'
  },
  render: (args) => <TimeTrackingBadge {...args} />
}
