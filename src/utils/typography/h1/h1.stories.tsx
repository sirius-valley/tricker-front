import type { Meta, StoryObj } from '@storybook/react';

import H1 from './h1';

const meta: Meta<typeof H1> = {
  component: H1,
};

export default meta;
type Story = StoryObj<typeof H1>;


export const Primary: Story = {
  args: {
    children: 'Heading 1',
  },
};