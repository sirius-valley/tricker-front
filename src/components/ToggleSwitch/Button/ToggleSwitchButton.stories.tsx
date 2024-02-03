import { Meta, StoryObj } from "@storybook/react";
import ToggleSwitchButton from "./ToggleSwitchButton";

const meta: Meta<typeof ToggleSwitchButton> = {
  title: "Components/ToggleSwitchButton",
  component: ToggleSwitchButton,
  tags: ["autodocs"],
  argTypes: {
    state: {
      options: ["default", "active", "disabled"],
      defaultValue: "active",
      control: {
        type: "select",
      },
    },
    size: {
      options: ["mobile", "desktop"],
      defaultValue: "desktop",
      control: {
        type: "select",
      },
    },
    text: {
      defaultValue: "Nº of tickets",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitchButton>;

export const Default: Story = {
  tags: ["autodocs"],
  args: {
    state: "default",
  },
  render: (args) => <ToggleSwitchButton {...args} />,
};

export const Active: Story = {
  tags: ["autodocs"],
  args: {
    state: "active",
  },
  render: (args) => <ToggleSwitchButton {...args} />,
};

export const Disabled: Story = {
  tags: ["autodocs"],
  args: {
    state: "disabled",
  },
  render: (args) => <ToggleSwitchButton {...args} />,
};
