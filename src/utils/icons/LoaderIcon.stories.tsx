import type { Meta, StoryObj } from '@storybook/react';

import LoaderIcon from './LoaderIcon';

const meta: Meta<typeof LoaderIcon> = {
  component: LoaderIcon,
};

export default meta;
type Story = StoryObj<typeof LoaderIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};