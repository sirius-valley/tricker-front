import type { Meta, StoryObj } from '@storybook/react'

import GridIcon from './GridIcon'

const meta: Meta<typeof GridIcon> = {
  component: GridIcon
}

export default meta
type Story = StoryObj<typeof GridIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
