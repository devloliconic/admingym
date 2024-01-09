import type { Meta, StoryObj } from "@storybook/react";

import "@/styles/global.scss";
import { LoginPage } from "@/pages/LoginPage";

const meta = {
  title: "GYM/Pages",
  component: LoginPage,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {};
