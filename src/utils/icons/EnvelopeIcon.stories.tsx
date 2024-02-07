import type { Meta, StoryObj } from '@storybook/react'

import EnvelopeIcon from './EnvelopeIcon'

const meta: Meta<typeof EnvelopeIcon> = {
  component: EnvelopeIcon
}

export default meta
type Story = StoryObj<typeof EnvelopeIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
