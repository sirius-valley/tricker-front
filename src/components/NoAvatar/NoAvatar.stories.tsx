import { type Meta, type StoryObj } from '@storybook/react'
import NoAvatar from './NoAvatar'

const meta: Meta<typeof NoAvatar> = {
  title: 'Components/NoAvatar',
  component: NoAvatar,
  tags: ['autodocs'],
  argTypes: {
    text: {
      defaultValue: 'Tricker',
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof NoAvatar>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    text: 'Tricker'
  },
  render: (args) => <NoAvatar {...args} />
}
