import type { Meta, StoryObj } from '@storybook/react'

import ChevronIcon from './ChevronIcon'

const meta: Meta<typeof ChevronIcon> = {
  component: ChevronIcon
}

export default meta
type Story = StoryObj<typeof ChevronIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
