import type { Meta, StoryObj } from '@storybook/react'

import CopyIcon from './CopyIcon'

const meta: Meta<typeof CopyIcon> = {
  component: CopyIcon
}

export default meta
type Story = StoryObj<typeof CopyIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
