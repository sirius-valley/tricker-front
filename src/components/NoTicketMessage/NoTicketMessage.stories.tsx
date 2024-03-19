import { type Meta, type StoryObj } from '@storybook/react'
import NoTicketMessage from './NoTicketMessage'

const meta: Meta<typeof NoTicketMessage> = {
  title: 'Components/NoTicketMessage',
  component: NoTicketMessage,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof NoTicketMessage>

export const NoTicketMessageStory: Story = {
  render: (args) => <NoTicketMessage {...args} />
}
