import { type Meta, type StoryObj } from '@storybook/react'
import { TabBar } from './TabBar'
import { mockedUsers } from './MockedUsers'

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  argTypes: {
    users: {
      defaultValue: 'Team statistics',
      description:
        'It is and array of UserProjectRole with every member of the project.',
      control: {
        type: 'null'
      }
    },
    handleChange: {
      table: {
        type: {
          summary: 'function'
        }
      },
      description: 'Callback to control the tab state.'
    }
  }
}

export default meta

type Story = StoryObj<typeof TabBar>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
      users: mockedUsers
  },

  render: (args) => (
    <div className="w-[600px]">
      <TabBar {...args} />
    </div>
  )
}
