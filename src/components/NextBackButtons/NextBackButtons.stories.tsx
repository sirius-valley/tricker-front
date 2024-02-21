import { type Meta, type Story } from "@storybook/react";
import { action } from '@storybook/addon-actions'
import PageNavigation, {NavProps} from "./NextBackButtons";

export default {
    title: 'Components/NextBackButtons',
    component: PageNavigation,
    tags: ['autodocs'],
    argTypes: {
        onClick: {
          table: {
            type: {
              summary: 'function'
            }
          },
          description: ''
        }
      }
} as Meta;

const Template: Story<NavProps> = (args) => <PageNavigation {...args} />

export const Default = Template.bind({});
Default.args = {
    onBack: action('Back clicked'),
    onNext: action('Next clicked'),
};