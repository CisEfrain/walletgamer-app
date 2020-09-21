import BaseButton from "./BaseButton.vue";

export default {
  title: "Wallet Gamer/BaseButton",
  component: BaseButton,
  argTypes: {
    backgroundColor: { control: "color" },
    size: { control: { type: "select", options: ["small", "medium", "full"] } },
    color: { control: { type: "select", options: ["primary", "secondary", "dark", "light"] } }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: '<BaseButton @onClick="onClick" v-bind="$props" />'
});

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
  label: "Primary button"
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
  label: "Secondary button"
};

export const Dark = Template.bind({});
Dark.args = {
  color: "dark",
  label: "Dark button"
};

export const Light = Template.bind({});
Light.args = {
  color: "light",
  label: "Light button"
};

export const Full = Template.bind({});
Full.args = {
  size: "full",
  label: "Full width button"
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "small button"
};
