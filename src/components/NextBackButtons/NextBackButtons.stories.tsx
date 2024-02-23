import { type Meta, type Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StepNavigation, { type NavProps } from './NextBackButtons'
import { Step } from './NextBackButtons'

export default {
  title: 'Components/StepNavigation',
  tags: ['autodocs'],
  component: StepNavigation,
  argTypes: {
    currentStep: {
      defaultValue: Step.Mid,
      options: [Step.First, Step.Last, Step.Mid],
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
  currentStep: Step.Last,
  onBack: action('Back clicked'),
  onNext: action('Next clicked')
}
