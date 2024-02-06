import { type Meta, type StoryObj } from '@storybook/react'
import { LoginWithButton } from './LoginWithButton'

const meta: Meta<typeof LoginWithButton> = {
  title: 'Components/LoginWithButton',
  component: LoginWithButton,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The variant of the button.',
      control: {
        type: 'text'
      }
    },
    iconName: {
      control: {
        type: 'select'
      },
      options: ['GoogleIcon'],
      table: {
        type: null
      },
      description: 'The icon to display on the button.'
    },
    redirectUrl: {
      description: 'The URL to redirect to.',
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof LoginWithButton>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    title: 'Log In With Google',
    iconName: 'GoogleIcon',
    redirectUrl: 'https://www.google.com/'
  },
  render: (args) => <LoginWithButton {...args} />
}

