import type { Meta, StoryObj } from '@storybook/react'

import HistoryIcon from './HistoryIcon'

const meta: Meta<typeof HistoryIcon> = {
  component: HistoryIcon
}

export default meta
type Story = StoryObj<typeof HistoryIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
