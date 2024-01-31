import type { Meta, StoryObj } from '@storybook/react';

import CaretUpIcon from './CaretUpIcon';

const meta: Meta<typeof CaretUpIcon> = {
  component: CaretUpIcon,
};

export default meta;
type Story = StoryObj<typeof CaretUpIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};