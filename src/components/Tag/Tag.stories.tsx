import { type Meta, type StoryObj } from '@storybook/react'
import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Tag>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    name: 'John Doe'
  },
  render: (args) => <Tag {...args} />
}
