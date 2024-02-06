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
      options: ['feature', 'improvement', 'bug'],
      table: {
        type: {
          summary: 'feature | improvement | bug'
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
      <PriorityIcon variant="feature" />
      <PriorityIcon variant="improvement" />
      <PriorityIcon variant="bug" />
    </div>
  )
}
