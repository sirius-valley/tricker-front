import { type Meta, type StoryObj } from '@storybook/react'
import PriorityIcon from './PriorityIcon'
import { Priority } from '@utils/types'

const meta: Meta<typeof PriorityIcon> = {
  title: 'Components/PriorityIcon',
  component: PriorityIcon,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select'
      },
      options: [
        Priority.NO_PRIORITY,
        Priority.LOW_PRIORITY,
        Priority.MEDIUM_PRIORITY,
        Priority.HIGH_PRIORITY,
        Priority.URGENT
      ],
      table: {
        type: {
          summary:
            'no-priority | low-priority | medium-priority | high-priority | urgent'
        }
      }
    },
    fillColor: {
      control: {
        type: 'color'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof PriorityIcon>

export const PriorityIcons: Story = {
  tags: ['autodocs'],
  args: {
    variant: Priority.NO_PRIORITY,
    fillColor: 'white'
  },
  render: (args) => (
    <div className="flex gap-2">
      <PriorityIcon {...args} />
    </div>
  )
}
