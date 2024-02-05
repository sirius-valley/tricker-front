import type { Meta, StoryObj } from '@storybook/react'

import HighPriorityIcon from './HighPriorityIcon'

const meta: Meta<typeof HighPriorityIcon> = {
  component: HighPriorityIcon
}

export default meta
type Story = StoryObj<typeof HighPriorityIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
