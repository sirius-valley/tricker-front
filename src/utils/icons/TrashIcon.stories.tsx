import type { Meta, StoryObj } from '@storybook/react';

import TrashIcon from './TrashIcon';

const meta: Meta<typeof TrashIcon> = {
  component: TrashIcon,
};

export default meta;
type Story = StoryObj<typeof TrashIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};