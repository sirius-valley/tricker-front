import type { Meta, StoryObj } from '@storybook/react'

import ChartDonutIcon from './ChartDonutIcon'

const meta: Meta<typeof ChartDonutIcon> = {
  component: ChartDonutIcon
}

export default meta
type Story = StoryObj<typeof ChartDonutIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
