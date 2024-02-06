import type { Meta, StoryObj } from '@storybook/react'

import TeamIcon from './TeamIcon'

const meta: Meta<typeof TeamIcon> = {
  component: TeamIcon
}

export default meta
type Story = StoryObj<typeof TeamIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
