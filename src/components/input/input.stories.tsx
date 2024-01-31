import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "error", "disabled"],
      defaultValue: "default",
      control: {
        type: "select",
      },
    },
    children: {
      defaultValue: "Input",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  tags: ["autodocs"],
  args: {
    placeholder: "This input is quite long",
  },
  render: (args) => <Input {...args}/>,
};
