import type { Meta, StoryObj } from '@storybook/react'

import SettingsIcon from './SettingsIcon'

const meta: Meta<typeof SettingsIcon> = {
  component: SettingsIcon
}

export default meta
type Story = StoryObj<typeof SettingsIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
