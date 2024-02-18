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

type Story = StoryObj<typeof CategoryIcon>

export const CategoryIcons: Story = {
  tags: ['autodocs'],
  render: () => (
    <div className="flex gap-2">
      <CategoryIcon variant="feature" />
      <CategoryIcon variant="improvement" />
      <CategoryIcon variant="bug" />
    </div>
  )
}
