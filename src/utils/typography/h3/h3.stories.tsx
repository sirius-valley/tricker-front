import type { Meta, StoryObj } from '@storybook/react'

import H3 from './h3'

const meta: Meta<typeof H3> = {
  component: H3
}

export default meta
type Story = StoryObj<typeof H3>

export const Primary: Story = {
  args: {
    children: 'Heading 3'
  }
}
