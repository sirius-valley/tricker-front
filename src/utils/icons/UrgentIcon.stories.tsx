import type { Meta, StoryObj } from '@storybook/react'

import UrgentIcon from './UrgentIcon'

const meta: Meta<typeof UrgentIcon> = {
  component: UrgentIcon
}

export default meta
type Story = StoryObj<typeof UrgentIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
