import { type Meta, type StoryObj } from '@storybook/react'
import SquaredIconButton from './SquaredIconButton'
import PlayIcon from '../../utils/icons/PlayIcon'
import StopIcon from '../../utils/icons/StopIcon'

const meta: Meta<typeof SquaredIconButton> = {
  title: 'Components/SquaredIconButton',
  component: SquaredIconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: null
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof SquaredIconButton>

export const Play: Story = {
  tags: ['autodocs'],
  args: {
    icon: <PlayIcon fillColor="white" />
  },
  render: (args) => <SquaredIconButton {...args} />
}

export const TrackingTime: Story = {
  tags: ['autodocs'],
  args: {
    icon: <StopIcon fillColor="white" />
  },
  render: (args) => <SquaredIconButton {...args} />
}
