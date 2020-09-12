import ComponentTest from "./ComponentTest.vue";

export default {
  title: "Wallet Gamer/ComponentTest",
  component: ComponentTest
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ComponentTest },
  template: '<ComponentTest v-bind="$props" />'
});

export const Main = Template.bind({});
Main.args = {
  msg: "First Type Test"
};

export const Second = Template.bind({});
Second.args = {
  msg: "Second Type Test"
};
