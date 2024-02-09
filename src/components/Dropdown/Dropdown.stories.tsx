import { type Meta, type StoryObj } from '@storybook/react'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    options: [
      {
        title: 'WeCan',
        image: 'https://via.placeholder.com/20'
      },
      {
        title: 'Bonterms',
        image: 'https://via.placeholder.com/20'
      },
      {
        title: 'Tricker',
        image: 'https://via.placeholder.com/20'
      },
      {
        title: 'Hospital Patagonia',
        image: 'https://via.placeholder.com/20'
      }
    ],
    handleSelect: (option) => {
      console.log(option)
    }
  },
  render: (args) => <Dropdown {...args} />
}
