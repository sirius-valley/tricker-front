import type { Meta, StoryObj } from '@storybook/react';

import CaretDownIcon from './CaretDownIcon';

const meta: Meta<typeof CaretDownIcon> = {
  component: CaretDownIcon,
};

export default meta;
type Story = StoryObj<typeof CaretDownIcon>;


export const Primary: Story = {
  args: {
    fillColor: 'white',
    width: '20',
    height: '20',
  },
};