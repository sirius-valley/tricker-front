import {Meta, StoryObj} from "@storybook/react";
import {NavbarItem} from "./NavbarItem";
import HomeIcon from "../../utils/icons/HomeIcon";

const meta: Meta<typeof NavbarItem> = {
  title: "Components/NavbarItem",
  component: NavbarItem,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "selected", "disabled"],
      defaultValue: "default",
      control: {
        type: "select",
      }
    },
    children: {
      defaultValue: "NavbarItem",
      control: {
        type: "text",
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof NavbarItem>;

export const Primary: Story = {
  tags: ["autodocs"],
  args: {
    icon: <HomeIcon width="20" height="20" />,
    children: "Texto"
  },
  render: (args) => <NavbarItem {...args}>{args.children}</NavbarItem>,
};