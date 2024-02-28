import { type Meta, type Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StepNavigation, { type NavProps } from './NextBackButtons'
import { StepType } from './NextBackButtons'

export default {
  title: 'Components/NextBackButton',
  tags: ['autodocs'],
  component: StepNavigation,
  argTypes: {
    currentStep: {
      defaultValue: StepType.MID,
      options: [StepType.FIRST, StepType.LAST, StepType.MID],
      control: {
        type: 'radio'
      }
    },
    onBack: { action: 'clicked' },
    onNext: { action: 'clicked' }
  }
} as Meta

const Template: Story<NavProps> = (args) => <StepNavigation {...args} />

export const Default = Template.bind({})
Default.args = {
  currentStep: StepType.MID,
  onBack: action('Back clicked'),
  onNext: action('Next clicked')
}
