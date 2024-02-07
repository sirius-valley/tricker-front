import type { Meta, StoryObj } from '@storybook/react'

import MediumPriorityIcon from './MediumPriorityIcon'

const meta: Meta<typeof MediumPriorityIcon> = {
  component: MediumPriorityIcon
}

export default meta
type Story = StoryObj<typeof MediumPriorityIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
