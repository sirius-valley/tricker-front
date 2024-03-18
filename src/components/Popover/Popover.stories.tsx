import { type Meta, type StoryObj } from '@storybook/react'
import Popover from './Popover'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  decorators: [
    (story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>,
    (Story) => <Provider store={store}>{Story()}</Provider>
  ],
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Popover>

export const Popovers: Story = {
  tags: ['autodocs'],
  args: {
    userId: '213'
  },
  render: (args) => <Popover show={true} {...args} />
}
