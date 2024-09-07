import type { Meta, StoryObj } from "@storybook/react";

import "@/styles/global.scss";
import { Navigation } from "@/components/Navigation";

const meta = {
  title: "GYM/Modules",
  component: Navigation,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationPanel: Story = {};
