import type { Meta, StoryObj } from '@storybook/react';

import LowPriorityIcon from './LowPriorityIcon';

const meta: Meta<typeof LowPriorityIcon> = {
  component: LowPriorityIcon,
};

export default meta;
type Story = StoryObj<typeof LowPriorityIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};