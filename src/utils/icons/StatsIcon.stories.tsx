import type { Meta, StoryObj } from '@storybook/react'

import StatsIcon from './StatsIcon'

const meta: Meta<typeof StatsIcon> = {
  component: StatsIcon
}

export default meta
type Story = StoryObj<typeof StatsIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
