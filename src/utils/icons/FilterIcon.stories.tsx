import type { Meta, StoryObj } from '@storybook/react'

import FilterIcon from './FilterIcon'

const meta: Meta<typeof FilterIcon> = {
  component: FilterIcon
}

export default meta
type Story = StoryObj<typeof FilterIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
