import type { Meta, StoryObj } from '@storybook/react'

import FolderIcon from './FolderIcon'

const meta: Meta<typeof FolderIcon> = {
  component: FolderIcon
}

export default meta
type Story = StoryObj<typeof FolderIcon>

export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20'
  }
}
