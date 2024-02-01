import { Meta, StoryObj } from "@storybook/react";
import { ProfileButton } from "./ProfileButton";

const meta: Meta<typeof ProfileButton> = {
  title: "Components/ProfileButton",
  component: ProfileButton,
  tags: ["autodocs"],
  argTypes: {
    img: {
      description: "You can insert an url or any image in the project.",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileButton>;

export const ProfilePictureButton: Story = {
  tags: ["autodocs"],
  args: {
    img: "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
  },
  render: (args) => <ProfileButton {...args} />,
};
