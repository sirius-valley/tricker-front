import { type Meta, type StoryObj } from '@storybook/react'
import Chronology from './Chronology'
import { MockedEvents } from './MockedEvents'

const meta: Meta<typeof Chronology> = {
  title: 'Components/Chronology',
  component: Chronology,
  tags: ['autodocs'],
  argTypes: {
    events: {
      description: 'Events to be shown in the chronology',
      control: {
        type: 'object'
      }
    },
    isLoading: {
      description: 'If the component should show a loading skeleton',
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Chronology>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    events: MockedEvents,
    isLoading: false
  },
  render: (args) => <Chronology {...args} />
}
