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
      { id: '1', user: { id: '1', name: 'Persona 1', email: '' } },
      { id: '2', user: { id: '2', name: 'Persona 2', email: '' } },
      { id: '3', user: { id: '3', name: 'Persona 3', email: '' } },
      { id: '4', user: { id: '4', name: 'Persona 4', email: '' } },
      { id: '5', user: { id: '5', name: 'Persona 5', email: '' } },
      { id: '6', user: { id: '6', name: 'Persona 6', email: '' } },
      { id: '7', user: { id: '7', name: 'Persona 7', email: '' } },
      { id: '8', user: { id: '8', name: 'Persona 8', email: '' } },
      { id: '9', user: { id: '9', name: 'Persona 9', email: '' } },
      { id: '10', user: { id: '10', name: 'Persona 10', email: '' } },
      { id: '11', user: { id: '11', name: 'Persona 11', email: '' } },
      { id: '12', user: { id: '12', name: 'Persona 12', email: '' } },
      { id: '13', user: { id: '13', name: 'Persona 13', email: '' } },
      { id: '14', user: { id: '14', name: 'Persona 14', email: '' } }
    ]
  },

  render: (args) => (
    <div className="w-[600px]">
      <TabBar {...args} />
    </div>
  )
}
