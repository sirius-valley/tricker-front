import { type Meta, type StoryObj } from '@storybook/react'
import CategoryIcon from './CategoryIcon'

const meta: Meta<typeof CategoryIcon> = {
  title: 'Components/CategoryIcon',
  component: CategoryIcon,
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

type Story = StoryObj<typeof CategoryIcon>

export const CategoryIcons: Story = {
  tags: ['autodocs'],
  render: () => (
    <div className="flex gap-2">
      <CategoryIcon variant="no-priority" />
      <CategoryIcon variant="low-priority" />
      <CategoryIcon variant="medium-priority" />
      <CategoryIcon variant="high-priority" />
      <CategoryIcon variant="urgent" />
    </div>
  )
}
