import type { Meta, StoryObj } from '@storybook/react'

import PlayIcon from './PlayIcon'

const meta: Meta<typeof PlayIcon> = {
  component: PlayIcon
}

export default meta
type Story = StoryObj<typeof PlayIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
