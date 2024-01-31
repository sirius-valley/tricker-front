import type { Meta, StoryObj } from '@storybook/react';

import GraphFilterIcon from './GraphFilterIcon';

const meta: Meta<typeof GraphFilterIcon> = {
  component: GraphFilterIcon,
};

export default meta;
type Story = StoryObj<typeof GraphFilterIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};