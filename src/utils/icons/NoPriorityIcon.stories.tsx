import type { Meta, StoryObj } from '@storybook/react';

import NoPriorityIcon from './NoPriorityIcon';

const meta: Meta<typeof NoPriorityIcon> = {
  component: NoPriorityIcon,
};

export default meta;
type Story = StoryObj<typeof NoPriorityIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};