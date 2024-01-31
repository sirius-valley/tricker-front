import type { Meta, StoryObj } from '@storybook/react';

import HomeIcon from './HomeIcon';

const meta: Meta<typeof HomeIcon> = {
  component: HomeIcon,
};

export default meta;
type Story = StoryObj<typeof HomeIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};