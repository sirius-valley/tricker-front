import type { Meta, StoryObj } from '@storybook/react'

import LogOutIcon from './LogOutIcon'

const meta: Meta<typeof LogOutIcon> = {
  component: LogOutIcon
}

export default meta
type Story = StoryObj<typeof LogOutIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
