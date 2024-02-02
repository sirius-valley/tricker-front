// import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button,{ButtonProps} from './systemButtons';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// Filled Variants
export const FilledDefaultLarge = Template.bind({});
FilledDefaultLarge.args = {
  size: 'large',
  variant: 'filled',
  state: 'default',
  children: 'Add Time',
  typography: 'filleddefault',
};

export const FilledDefaultMedium = Template.bind({});
FilledDefaultMedium.args = {
  size: 'medium',
  variant: 'filled',
  state: 'default',
  children: 'Add Time',
  typography: 'filleddefault',
};

export const FilledHoverLarge = Template.bind({});
FilledHoverLarge.args = {
  size: 'large',
  variant: 'filled',
  state: 'hover',
  children: 'Add Time',
  typography: 'filleddefault',
};

export const FilledHoverMedium = Template.bind({});
FilledHoverMedium.args = {
  size: 'medium',
  variant: 'filled',
  state: 'hover',
  children: 'Add Time',
  typography: 'filleddefault',
};

export const FilledDisabledLarge = Template.bind({});
FilledDisabledLarge.args = {
  size: 'large',
  variant: 'filled',
  state: 'disabled',
  children: 'Add Time',
  typography: 'filleddisabled',
};

export const FilledDisabledMedium = Template.bind({});
FilledDisabledMedium.args = {
  size: 'medium',
  variant: 'filled',
  state: 'disabled',
  children: 'Add Time',
  typography: 'filleddisabled',
};

// Outline Variants
export const OutlineDefaultLarge = Template.bind({});
OutlineDefaultLarge.args = {
  size: 'large',
  variant: 'outline',
  state: 'defaultoutline',
  children: 'Add Time',
  typography: 'defaultoutline',

};

export const OutlineDefaultMedium = Template.bind({});
OutlineDefaultMedium.args = {
  size: 'medium',
  variant: 'outline',
  state: 'defaultoutline',
  children: 'Add Time',
  typography: 'defaultoutline',
};

export const OutlineHoverLarge = Template.bind({});
OutlineHoverLarge.args = {
  size: 'large',
  variant: 'outline',
  state: 'hoveroutline',
  children: 'Add Time',
  typography: 'hoveroutline',
};

export const OutlineHoverMedium = Template.bind({});
OutlineHoverMedium.args = {
  size: 'medium',
  variant: 'outline',
  state: 'hoveroutline',
  children: 'Add Time',
  typography: 'hoveroutline',
};

export const OutlineDisabledLarge = Template.bind({});
OutlineDisabledLarge.args = {
  size: 'large',
  variant: 'outline',
  state: 'disabled',
  children: 'Add Time',
  typography: 'disabledoutline',
};

export const OutlineDisabledMedium = Template.bind({});
OutlineDisabledMedium.args = {
  size: 'medium',
  variant: 'outline',
  state: 'disabled',
  children: 'Add Time',
  typography: 'disabledoutline',
};

// Ghost Variants
export const GhostDefaultLarge = Template.bind({});
GhostDefaultLarge.args = {
  size: 'large',
  variant: 'ghost',
  state: 'ghostdefault',
  children: 'Add Time',
  typography: 'defaultghost',
};

export const GhostDefaultMedium = Template.bind({});
GhostDefaultMedium.args = {
  size: 'medium',
  variant: 'ghost',
  state: 'ghostdefault',
  children: 'Add Time',
  typography: 'defaultghost',
};

export const GhostHoverLarge = Template.bind({});
GhostHoverLarge.args = {
  size: 'large',
  variant: 'ghost',
  state: 'ghosthover',
  children: 'Add Time',
  typography: 'defaultghost',
};

export const GhostHoverMedium = Template.bind({});
GhostHoverMedium.args = {
  size: 'medium',
  variant: 'ghost',
  state: 'ghosthover',
  children: 'Add Time',
  typography: 'defaultghost',
};

export const GhostDisabledLarge = Template.bind({});
GhostDisabledLarge.args = {
  size: 'large',
  variant: 'ghost',
  state: 'disabled',
  children: 'Add Time',
  typography: 'filleddisabled',
};

export const GhostDisabledMedium = Template.bind({});
GhostDisabledMedium.args = {
  size: 'medium',
  variant: 'ghost',
  state: 'ghostdefault',
  children: 'Add Time',
  typography: 'disabledoutline',
};
