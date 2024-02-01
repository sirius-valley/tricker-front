import {Meta, StoryObj} from "@storybook/react";
import {Pill} from "./Pill";

const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "gradient", "error"],
      defaultValue: "default",
      control: {
        type: "select",
      }
    },
    children: {
      defaultValue: "Pill",
      control: {
        type: "text",
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Pill>;

export const Primary: Story = {
  tags: ["autodocs"],
  args: {
    children: "Primary",
  },
  render: (args) => <Pill {...args}>{args.children}</Pill>,
};