import type { Meta, StoryObj } from '@storybook/react'

import SubstractTimeIcon from './SubstractTimeIcon'

const meta: Meta<typeof SubstractTimeIcon> = {
  component: SubstractTimeIcon
}

export default meta
type Story = StoryObj<typeof SubstractTimeIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
