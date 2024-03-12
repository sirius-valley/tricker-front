import { type Meta, type StoryObj } from '@storybook/react'
import FilterSection from './FilterSection'
import { type OptionAttr } from '@components/Filter/Filter'

const meta: Meta<typeof FilterSection> = {
  title: 'Components/FilterSection',
  component: FilterSection,
  tags: ['autodocs'],
  argTypes: {
    handleSelect: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage selected options.'
    },
    handleSearch: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage searched ticket.'
    },
    handleView: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage grid or list view.'
    }
  }
}

export default meta

type Story = StoryObj<typeof FilterSection>

export const DefaultFilterSection: Story = {
  tags: ['autodocs'],
  args: {
    handleSelect: function (options: OptionAttr[]): void {
      console.log(options)
    },
    handleSearch: function (searchedValue: string): void {
      console.log(searchedValue)
    },
    handleView: function (view: 'grid' | 'list'): void {
      console.log(view)
    }
  },
  render: (args) => (
    <div className="h-screen w-screen bg-gray-700">
      <FilterSection {...args} />
    </div>
  )
}
