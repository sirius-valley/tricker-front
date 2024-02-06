import { type Meta, type StoryObj } from '@storybook/react'
import { NeedHelpButton } from './NeedHelpButton'

const meta: Meta<typeof NeedHelpButton> = {
  title: 'Components/NeedHelpButton',
  component: NeedHelpButton,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof NeedHelpButton>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    title: 'Log In With Google',
    iconName: 'GoogleIcon',
    redirectUrl: 'https://www.google.com/'
  },
  render: (args) => <NeedHelpButton {...args} />
}
