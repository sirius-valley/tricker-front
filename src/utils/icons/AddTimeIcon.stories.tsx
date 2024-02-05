import type { Meta, StoryObj } from '@storybook/react'

import AddTimeIcon from './AddTimeIcon'

const meta: Meta<typeof AddTimeIcon> = {
  component: AddTimeIcon
}

export default meta
type Story = StoryObj<typeof AddTimeIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
