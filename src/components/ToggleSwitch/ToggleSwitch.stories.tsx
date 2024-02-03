import { Meta, StoryObj } from "@storybook/react";
import { ToggleSwitch } from "./ToggleSwitch";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Components/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  argTypes: {
    disableFirstOption: {},
    onChecked: {
      table: {
        type: {
          summary: "function",
        },
      },
      description: "Callback when the switch is toggled, returns a Boolean",
    },
    label: {
      defaultValue: "Label text",
      control: {
        type: "text",
      },
    },
    size: {
      options: ["mobile", "desktop"],
      defaultValue: "desktop",
      control: {
        type: "select",
      },
    },
    firstOption: {
      defaultValue: "Nº of tickets",
      control: {
        type: "text",
      },
      description: "First button text",
    },
    secondOption: {
      defaultValue: "Nº of tickets",
      control: {
        type: "text",
      },
      description: "Second button text",

    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
  tags: ["autodocs"],
  args: {
    disableFirstOption: false,
    disableSecondOption: false,
    firstOption: "Nº of tickets",
    secondOption: "Nº of hours",
    label: "Label text",
    required: false,
    size: "desktop",
  },
  render: (args) => <ToggleSwitch {...args} />,
};
