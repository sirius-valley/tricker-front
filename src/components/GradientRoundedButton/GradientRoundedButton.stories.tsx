import { type Meta, type StoryObj } from '@storybook/react'
import { GradientRoundedButton } from './GradientRoundedButton'
import Icon from '../Icon/Icon'

const meta: Meta<typeof GradientRoundedButton> = {
  title: 'Components/GradientRoundedButton',
  component: GradientRoundedButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: null
      }
    },
    size: {
      options: ['md', 'lg'],
      defaultValue: 'lg',
      control: {
        type: 'select'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof GradientRoundedButton>

export const Play: Story = {
  tags: ['autodocs'],
  args: {
    icon: <Icon name="PlayIcon" fillColor="black" />,
    size: 'lg'
  },
  render: (args) => <GradientRoundedButton {...args} />
}

export const Stop: Story = {
  tags: ['autodocs'],
  args: {
    icon: <Icon name="StopIcon" fillColor="black" />,
    size: 'lg'
  },
  render: (args) => <GradientRoundedButton {...args} />
}
