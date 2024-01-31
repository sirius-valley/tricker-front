import type { Meta, StoryObj } from '@storybook/react';

import CloudIcon from './CloudIcon';

const meta: Meta<typeof CloudIcon> = {
  component: CloudIcon,
};

export default meta;
type Story = StoryObj<typeof CloudIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};