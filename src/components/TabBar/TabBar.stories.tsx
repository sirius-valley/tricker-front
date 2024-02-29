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
      { id: '1', user: { name: 'Persona 1' } },
      { id: '2', user: { name: 'Persona 2' } },
      { id: '3', user: { name: 'Persona 3' } },
      { id: '4', user: { name: 'Persona 4' } },
      { id: '5', user: { name: 'Persona 5' } },
      { id: '6', user: { name: 'Persona 6' } },
      { id: '7', user: { name: 'Persona 7' } },
      { id: '8', user: { name: 'Persona 8' } },
      { id: '9', user: { name: 'Persona 9' } },
      { id: '10', user: { name: 'Persona 10' } },
      { id: '11', user: { name: 'Persona 11' } },
      { id: '12', user: { name: 'Persona 12' } },
      { id: '13', user: { name: 'Persona 13' } },
      { id: '14', user: { name: 'Persona 14' } }
    ]
  },

  render: (args) => (
    <div className="w-[600px]">
      <TabBar {...args} />
    </div>
  )
}
