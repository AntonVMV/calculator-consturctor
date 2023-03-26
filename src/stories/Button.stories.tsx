import { Button } from "components/Shared/Button/Button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Button",
  styleType: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  styleType: "secondary",
};
