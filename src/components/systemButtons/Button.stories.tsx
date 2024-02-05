// import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';

const Template: Story<ButtonProps> = ({ variant, ...args }) => {
  const isDisabled = variant === 'disabled';
  return <Button {...args} disabled={isDisabled} />;
};

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ["filled", "outline", "ghost"],
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

// Filled Variants
export const FilledDefaultLarge = Template.bind({});
FilledDefaultLarge.args = {
  size: 'large',
  variant: 'filled',
  children: 'Add Time',
};

export const FilledDefaultMedium = Template.bind({});
FilledDefaultMedium.args = {
  size: 'medium',
  variant: 'filled',
  disabled: true,
  children: 'Add Time',
};

export const FilledHoverLarge = Template.bind({});
FilledHoverLarge.args = {
  size: 'large',
  variant: 'filled',
  // state: 'hover',
  children: 'Add Time',
};

export const FilledHoverMedium = Template.bind({});
FilledHoverMedium.args = {
  size: 'medium',
  variant: 'filled',
  // state: 'hover',
  children: 'Add Time',
};

export const FilledDisabledLarge = Template.bind({});
FilledDisabledLarge.args = {
  size: 'large',
  variant: 'filled',
  disabled: true,
  children: 'Add Time',
};

export const FilledDisabledMedium = Template.bind({});
FilledDisabledMedium.args = {
  size: 'medium',
  variant: 'filled',
  disabled: true,
  children: 'Add Time',
};

// Outline Variants
export const OutlineDefaultLarge = Template.bind({});
OutlineDefaultLarge.args = {
  size: 'large',
  variant: 'outline',
  // state:'outlinedefault',
  // disabled:true,
  children: 'Add Time',

};

export const OutlineDefaultMedium = Template.bind({});
OutlineDefaultMedium.args = {
  size: 'medium',
  variant: 'outline',
  // state: 'defaultoutline',
  children: 'Add Time',
};

export const OutlineHoverLarge = Template.bind({});
OutlineHoverLarge.args = {
  size: 'large',
  variant: 'outline',
  // state: 'hoveroutline',
  children: 'Add Time',
};

export const OutlineHoverMedium = Template.bind({});
OutlineHoverMedium.args = {
  size: 'medium',
  variant: 'outline',
  // state: 'hoveroutline',
  children: 'Add Time',
};

export const OutlineDisabledLarge = Template.bind({});
OutlineDisabledLarge.args = {
  size: 'large',
  variant: 'outline',
  disabled: true,
  children: 'Add Time',
};

export const OutlineDisabledMedium = Template.bind({});
OutlineDisabledMedium.args = {
  size: 'medium',
  variant: 'outline',
  disabled: true,
  children: 'Add Time',
};

// Ghost Variants
export const GhostDefaultLarge = Template.bind({});
GhostDefaultLarge.args = {
  size: 'large',
  variant: 'ghost',
  children: 'Add Time',
};

export const GhostDefaultMedium = Template.bind({});
GhostDefaultMedium.args = {
  size: 'medium',
  variant: 'ghost',
  // state: 'ghostdefault',
  children: 'Add Time',
};

export const GhostHoverLarge = Template.bind({});
GhostHoverLarge.args = {
  size: 'large',
  variant: 'ghost',
  // state: 'ghosthover',
  children: 'Add Time',
};

export const GhostHoverMedium = Template.bind({});
GhostHoverMedium.args = {
  size: 'medium',
  variant: 'ghost',
  children: 'Add Time',
};

export const GhostDisabledLarge = Template.bind({});
GhostDisabledLarge.args = {
  size: 'large',
  variant: 'ghost',
  children: 'Add Time',
};

export const GhostDisabledMedium = Template.bind({});
GhostDisabledMedium.args = {
  size: 'medium',
  variant: 'ghost',
  disabled: true,
  children: 'Add Time',
};
