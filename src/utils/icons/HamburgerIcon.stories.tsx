import type { Meta, StoryObj } from '@storybook/react'

import HamburgerIcon from './HamburgerIcon'

const meta: Meta<typeof HamburgerIcon> = {
  component: HamburgerIcon
}

export default meta
type Story = StoryObj<typeof HamburgerIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
