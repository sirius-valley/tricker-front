import type { Meta, StoryObj } from '@storybook/react'

import BugIcon from './BugIcon'

const meta: Meta<typeof BugIcon> = {
  component: BugIcon
}

export default meta
type Story = StoryObj<typeof BugIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
