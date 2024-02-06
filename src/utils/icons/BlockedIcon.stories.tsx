import type { Meta, StoryObj } from '@storybook/react'

import BlockedIcon from './BlockedIcon'

const meta: Meta<typeof BlockedIcon> = {
  component: BlockedIcon
}

export default meta
type Story = StoryObj<typeof BlockedIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
