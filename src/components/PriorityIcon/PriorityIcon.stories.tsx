import { type Meta, type StoryObj } from '@storybook/react'
import PriorityIcon from './PriorityIcon'

const meta: Meta<typeof PriorityIcon> = {
  title: 'Components/PriorityIcon',
  component: PriorityIcon,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: null
      },
      options: [
        'no-priority',
        'low-priority',
        'medium-priority',
        'high-priority',
        'urgent'
      ],
      table: {
        type: {
          summary:
            'no-priority | low-priority | medium-priority | high-priority | urgent'
        }
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof PriorityIcon>

export const PriorityIcons: Story = {
  tags: ['autodocs'],
  render: () => (
    <div className="flex gap-2">
      <PriorityIcon variant="no-priority" />
      <PriorityIcon variant="low-priority" />
      <PriorityIcon variant="medium-priority" />
      <PriorityIcon variant="high-priority" />
      <PriorityIcon variant="urgent" />
    </div>
  )
}
