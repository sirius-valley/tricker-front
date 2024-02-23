import { type Meta, type StoryObj } from '@storybook/react'
import NoAvatarProject from './NoAvatarProject'

const meta: Meta<typeof NoAvatarProject> = {
  title: 'Components/NoAvatarProject',
  component: NoAvatarProject,
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

type Story = StoryObj<typeof NoAvatarProject>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    text: 'Tricker'
  },
  render: (args) => <NoAvatarProject {...args} />
}
