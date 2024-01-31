import type { Meta, StoryObj } from '@storybook/react';

import ImprovementIcon from './ImprovementIcon';

const meta: Meta<typeof ImprovementIcon> = {
  component: ImprovementIcon,
};

export default meta;
type Story = StoryObj<typeof ImprovementIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};