import type { Meta, StoryObj } from '@storybook/react';

import HelperText from './helpertext';

const meta: Meta<typeof HelperText> = {
  component: HelperText,
};

export default meta;
type Story = StoryObj<typeof HelperText>;


export const Primary: Story = {
  args: {
    children: 'Helpertext',
  },
};