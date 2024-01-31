import type { Meta, StoryObj } from '@storybook/react';

import H2 from './h2';

const meta: Meta<typeof H2> = {
  component: H2,
};

export default meta;
type Story = StoryObj<typeof H2>;


export const Primary: Story = {
  args: {
    children: 'Heading 2',
    className: '',
  },
};