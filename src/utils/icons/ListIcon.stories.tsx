import type { Meta, StoryObj } from '@storybook/react'

import ListIcon from './ListIcon'

const meta: Meta<typeof ListIcon> = {
  component: ListIcon
}

export default meta
type Story = StoryObj<typeof ListIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
