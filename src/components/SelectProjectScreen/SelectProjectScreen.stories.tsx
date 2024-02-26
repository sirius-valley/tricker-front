import { type Meta, type StoryObj } from '@storybook/react'
import SelectProjectScreen, {
  type SelectProjectScreenProps
} from './SelectProjectScreen'

const meta: Meta<SelectProjectScreenProps> = {
  title: 'Components/SelectProjectScreen',
  component: SelectProjectScreen,
  tags: ['autodocs'],
  argTypes: {
    handleSelection: {
      action: 'handleSelection'
    }
  }
}

export default meta

type Story = StoryObj<typeof SelectProjectScreen>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    handleSelection: (id: string) => {
      console.log(id)
    }
  },
  render: (args) => <SelectProjectScreen {...args} />
}
