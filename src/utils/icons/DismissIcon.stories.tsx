import type { Meta, StoryObj } from '@storybook/react';

import DismissIcon from './DismissIcon';

const meta: Meta<typeof DismissIcon> = {
  component: DismissIcon,
};

export default meta;
type Story = StoryObj<typeof DismissIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};