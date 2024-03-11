import { type Meta, type StoryObj } from '@storybook/react'
import { TabItem } from './TabItem'

const meta: Meta<typeof TabItem> = {
  title: 'Components/TabItem',
  component: TabItem,
  tags: ['autodocs'],
  argTypes: {
    teamMember: {
      defaultValue: 'Team statistics',
      description: 'It is the Persona Name or the Team Statistics title.',
      control: {
        type: 'text'
      }
    },
    active: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    onClick: {
      table: {
        type: {
          summary: 'function'
        }
      },
      description: 'Callback when the tab is toggled.'
    }
  }
}

export default meta

type Story = StoryObj<typeof TabItem>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    teamMember: 'Team statistics'
  },
  render: (args) => <TabItem {...args} />
}
