import { type Meta, type Story } from '@storybook/react'
import SelectProjectScreen, {
  type SelectProjectScreenProps
} from './SelectProjectScreen'

const meta: Meta<SelectProjectScreenProps> = {
  title: 'Components/SelectProjectScreen',
  component: SelectProjectScreen,
  tags: ['autodocs'],
  argTypes: {}
}

export default meta

const Template: Story<SelectProjectScreenProps> = (args) => (
  <SelectProjectScreen {...args} />
)

export const Primary = Template.bind({})
