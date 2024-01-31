import type { Meta, StoryObj } from '@storybook/react';

import Subtitle from './subtitle';

const meta: Meta<typeof Subtitle> = {
  component: Subtitle,
};

export default meta;
type Story = StoryObj<typeof Subtitle>;


export const Primary: Story = {
  args: {
    children: 'Subtitle 1',
  },
};