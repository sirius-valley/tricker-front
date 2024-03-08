import { type Meta, type StoryObj } from '@storybook/react'
import { ProfilePicture } from './ProfilePicture'

const meta: Meta<typeof ProfilePicture> = {
  title: 'Components/ProfilePicture',
  component: ProfilePicture,
  tags: ['autodocs'],
  argTypes: {
    img: {
      description: 'You can insert an url or any image in the project.',
      control: {
        type: 'text'
      }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      control: {
        type: 'select'
      }
    },
    border: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof ProfilePicture>

export const ProfilePictureButton: Story = {
  tags: ['autodocs'],
  args: {
    img: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
  },
  render: (args) => <ProfilePicture {...args} />
}
