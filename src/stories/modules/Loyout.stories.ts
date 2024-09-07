import type { Meta, StoryObj } from "@storybook/react";

import "@/styles/global.scss";
import { Loyout } from "@/components/Loyout/Loyout";

const meta = {
  title: "GYM/Modules",
  component: Loyout,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof Loyout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageLoyout: Story = {
  args: {
    children: "loyout"
  }
};
