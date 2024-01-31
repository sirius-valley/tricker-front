import type { Meta, StoryObj } from '@storybook/react';

import MeatBallsIcon from './MeatBallsIcon';

const meta: Meta<typeof MeatBallsIcon> = {
  component: MeatBallsIcon,
};

export default meta;
type Story = StoryObj<typeof MeatBallsIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};