import { type Meta, type StoryObj } from '@storybook/react'
import Timer from './Timer'

const meta: Meta<typeof Timer> = {
  title: 'Components/Timer',
  component: Timer,
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

type Story = StoryObj<typeof Timer>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    ticketId: 'TKT-000'
  },
  render: (args) => <Timer {...args} />
}
