import type { Meta, StoryObj } from '@storybook/react'

import Body1 from './body1'

const meta: Meta<typeof Body1> = {
  component: Body1
}

export default meta
type Story = StoryObj<typeof Body1>

export const Primary: Story = {
  args: {
    children: 'Body 1'
  }
}
