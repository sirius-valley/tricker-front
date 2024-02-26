import { type Meta, type StoryObj } from '@storybook/react'
import StoryPointsIcon from './StoryPointsIcon'

const meta: Meta<typeof StoryPointsIcon> = {
  title: 'Components/StoryPointsIcon',
  component: StoryPointsIcon,
  tags: ['autodocs'],
  argTypes: {
    fillColor: {
      defaultValue: 'white',
      control: {
        type: 'text'
      }
    },
    points: {
      control: {
        type: 'number'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof StoryPointsIcon>

export const StoryPoints: Story = {
  tags: ['autodocs'],
  args: {
    points: 3,
    fillColor: 'white'
  },
  render: (args) => <StoryPointsIcon {...args} />
}
