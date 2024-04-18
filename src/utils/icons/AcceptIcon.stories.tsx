import type { Meta, StoryObj } from '@storybook/react'

import AcceptIcon from './AcceptIcon'

const meta: Meta<typeof AcceptIcon> = {
  component: AcceptIcon
}

export default meta
type Story = StoryObj<typeof AcceptIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
