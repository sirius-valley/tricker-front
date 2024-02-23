import { type Meta, type Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import StepNavigation, { type NavProps } from './NextBackButtons'
import { Step } from './NextBackButtons'

export default {
  title: 'Components/StepNavigation',
  component: StepNavigation,
  argTypes: {
    onBack: { action: 'clicked' },
    onNext: { action: 'clicked' }
  }
} as Meta

const Template: Story<NavProps> = (args) => <StepNavigation {...args} />

export const Default = Template.bind({})
Default.args = {
  currentStep: Step.First,
  onBack: action('Back clicked'),
  onNext: action('Next clicked')
}
