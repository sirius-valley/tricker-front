import { type Meta, type StoryObj } from '@storybook/react'
import { TabBar } from './TabBar'

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
    users: [
      { id: '1', user: { username: 'Persona 1' } },
      { id: '2', user: { username: 'Persona 2' } },
      { id: '3', user: { username: 'Persona 3' } },
      { id: '4', user: { username: 'Persona 4' } },
      { id: '5', user: { username: 'Persona 5' } },
      { id: '6', user: { username: 'Persona 6' } },
      { id: '7', user: { username: 'Persona 7' } },
      { id: '8', user: { username: 'Persona 8' } },
      { id: '9', user: { username: 'Persona 9' } },
      { id: '10', user: { username: 'Persona 10' } },
      { id: '11', user: { username: 'Persona 11' } },
      { id: '12', user: { username: 'Persona 12' } },
      { id: '13', user: { username: 'Persona 13' } },
      { id: '14', user: { username: 'Persona 14' } }
    ]
  },

  render: (args) => (
    <div className="w-[600px]">
      <TabBar {...args} />
    </div>
  )
}