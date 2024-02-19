import { type Meta, type StoryObj } from '@storybook/react'
import CategoryIcon from './CategoryIcon'

const meta: Meta<typeof CategoryIcon> = {
  title: 'Components/CategoryIcon',
  component: CategoryIcon,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select'
      },
      options: ['feature', 'improvement', 'bug'],
      table: {
        type: {
          summary: 'feature | improvement | bug'
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

type Story = StoryObj<typeof CategoryIcon>

export const CategoryIcons: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'feature',
    fillColor: 'white'
  },
  render: (args) => <CategoryIcon {...args} />
}
