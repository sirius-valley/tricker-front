import type { Meta, StoryObj } from '@storybook/react';

import CheckIcon from './CheckIcon';

const meta: Meta<typeof CheckIcon> = {
  component: CheckIcon,
};

export default meta;
type Story = StoryObj<typeof CheckIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};