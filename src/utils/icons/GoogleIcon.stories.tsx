import type { Meta, StoryObj } from "@storybook/react";

import GoogleIcon from "./GoogleIcon";

const meta: Meta<typeof GoogleIcon> = {
  component: GoogleIcon,
};

export default meta;
type Story = StoryObj<typeof GoogleIcon>;

export const Primary: Story = {
  args: {
    width: "20",
    height: "20",
  },
};
