import type { Meta, StoryObj } from '@storybook/react'

import RefreshIcon from './RefreshIcon'

const meta: Meta<typeof RefreshIcon> = {
  component: RefreshIcon
}

export default meta
type Story = StoryObj<typeof RefreshIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
