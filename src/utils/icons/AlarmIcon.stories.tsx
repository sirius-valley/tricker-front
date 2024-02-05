import type { Meta, StoryObj } from '@storybook/react'

import AlarmIcon from './AlarmIcon'

const meta: Meta<typeof AlarmIcon> = {
  component: AlarmIcon
}

export default meta
type Story = StoryObj<typeof AlarmIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
