import { type Meta, type StoryObj } from '@storybook/react'
import Divider from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    color: {
      defaultValue: 'white',
      control: {
        type: 'text'
      }
    },
    vertical: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Divider>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    color: 'white',
    vertical: false
  },
  render: (args) => (
    <div className="w-[200px] h-[200px]">
      <Divider {...args} />
    </div>
  )
}
