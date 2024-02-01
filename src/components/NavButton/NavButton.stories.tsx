import { Meta, StoryObj } from "@storybook/react";
import NavButton from "./NavButton";

//It should be removed when the way of retrieving the profile picture is implemented.
const picture: string =
  "https://images.ecestaticos.com/FVdcvD11qPRi-JWDH3USTiXDmeQ=/0x0:2120x1414/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F47b%2F328%2F963%2F47b3289639713b8e80c8d682d219fba7.jpg";

const meta: Meta<typeof NavButton> = {
  title: "Components/NavButton",
  component: NavButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["stats", "home", "projects", "team", "profile"],
      defaultValue: "stats",
      control: {
        type: "select",
      },
    },
    state: {
      description: "It indicates whether the button is active or not.",
      options: ["on", "off"],
      defaultValue: "on",
      control: {
        type: "select",
      },
    },
    profilePicture: {
      description:
        "Temporarily, we will pass the profile picture as a string; in the future, it will be retrieved from the same component.",
      defaultValue: picture,
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavButton>;

export const Stats: Story = {
  tags: ["autodocs"],
  args: {
    variant: "stats",
    state: "on",
  },
  render: (args) => <NavButton {...args} />,
};

export const Home: Story = {
  tags: ["autodocs"],
  args: {
    variant: "home",
    state: "on",
  },
  render: (args) => <NavButton {...args} />,
};

export const Projects: Story = {
  tags: ["autodocs"],
  args: {
    variant: "projects",
    state: "on",
  },
  render: (args) => <NavButton {...args} />,
};

export const Team: Story = {
  tags: ["autodocs"],
  args: {
    variant: "team",
    state: "on",
  },
  render: (args) => <NavButton {...args} />,
};

export const Profile: Story = {
  tags: ["autodocs"],
  args: {
    variant: "profile",
    profilePicture: picture,
    state: "on",
  },
  render: (args) => <NavButton {...args} />,
};
