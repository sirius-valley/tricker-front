import { type Meta, type StoryObj } from '@storybook/react'
import { Select } from './MyProjectSelection'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const meta: Meta<typeof Select> = {
  title: 'Components/MyProjectSelection',
  component: Select,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Select>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    options: [
      {
        id: '1',
        title: 'WeCan',
        image: 'https://via.placeholder.com/20'
      },
      {
        id: '2',
        title: 'Bonterms',
        image: 'https://via.placeholder.com/20'
      },
      {
        id: '3',
        title: 'Tricker',
        image: 'https://via.placeholder.com/20'
      },
      {
        id: '4',
        title: 'Hospital Patagonia',
        image: 'https://via.placeholder.com/20'
      }
    ],
    preselectedOption: {
      id: '2',
      title: 'Bonterms',
      image: 'https://via.placeholder.com/20'
    },
    handleSelect: () => {}
  },
  render: (args) => (
    <Provider store={store}>
      <Select {...args} />
    </Provider>
  )
}
