import { type Meta, type StoryObj } from '@storybook/react'
import RoleButton from './RoleButton'

const meta: Meta<typeof RoleButton> = {
  title: 'Components/RoleButton',
  component: RoleButton,
  tags: ['autodocs'],
  argTypes: {
    handleClick: {
      control: {
        type: 'function'
      },
      description: 'Function which is triggered when the button is clicked'
    },
    children: {
      defaultValue: "I'm Project Manager",
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof RoleButton>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    handleClick: () => {},
    children: "I'm a Project Manager"
  },
  render: (args) => (
    <div className="flex max-w-[680px] lg:max-w-max">
      <RoleButton {...args} />
    </div>
  )
}
