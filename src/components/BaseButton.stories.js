import BaseButton from "./BaseButton.vue";

export default {
  title: "Wallet Gamer/BaseButton",
  component: BaseButton,
  argTypes: {
    backgroundColor: { control: "color" },
    size: { control: { type: "select", options: ["small", "medium", "large"] } }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: '<BaseButton @onClick="onClick" v-bind="$props" />'
});

export const Main = Template.bind({});
Main.args = {
  primary: true,
  label: "Button"
};

export const Second = Template.bind({});
Second.args = {
  label: "Button"
};

export const L = Template.bind({});
L.args = {
  size: "large",
  label: "Button"
};

export const Sm = Template.bind({});
Sm.args = {
  size: "small",
  label: "Button"
};
