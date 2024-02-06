import type { Meta, StoryObj } from '@storybook/react'

import UserIcon from './UserIcon'

const meta: Meta<typeof UserIcon> = {
  component: UserIcon
}

export default meta
type Story = StoryObj<typeof UserIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
