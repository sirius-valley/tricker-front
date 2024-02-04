import type { Meta, StoryObj } from '@storybook/react'

import FeatureIcon from './FeatureIcon'

const meta: Meta<typeof FeatureIcon> = {
  component: FeatureIcon
}

export default meta
type Story = StoryObj<typeof FeatureIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
