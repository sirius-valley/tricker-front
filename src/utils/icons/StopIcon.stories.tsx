import type { Meta, StoryObj } from '@storybook/react';

import StopIcon from './StopIcon';

const meta: Meta<typeof StopIcon> = {
  component: StopIcon,
};

export default meta;
type Story = StoryObj<typeof StopIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};