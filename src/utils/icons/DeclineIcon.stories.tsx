import type { Meta, StoryObj } from '@storybook/react'

import DeclineIcon from './DeclineIcon'

const meta: Meta<typeof DeclineIcon> = {
  component: DeclineIcon
}

export default meta
type Story = StoryObj<typeof DeclineIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
