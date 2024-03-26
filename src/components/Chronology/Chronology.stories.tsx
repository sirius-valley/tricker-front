import { type Meta, type Story } from '@storybook/react'
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
    }
  }
}

export default meta

const Template: Story = (args) => <Chronology {...args} />

export const Primary: Story = Template.bind({})
Primary.args = {
  events: MockedEvents
}
