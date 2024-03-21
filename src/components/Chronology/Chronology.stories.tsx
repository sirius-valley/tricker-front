import { type Meta, type Story } from '@storybook/react'
import Chronology, { type ChronologyProps } from './Chronology'
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

const Template: Story<ChronologyProps> = (args) => <Chronology {...args} />

export const Primary: Story<ChronologyProps> = Template.bind({})
Primary.args = {
  events: MockedEvents
}
