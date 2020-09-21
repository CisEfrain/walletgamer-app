import BaseCardContainer from "./BaseCardContainer.vue";

export default {
  title: "Wallet Gamer/BaseCardContainer",
  component: BaseCardContainer,
  argTypes: {
    backgroundColor: { control: "color" }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseCardContainer },
  template: `
    <BaseCardContainer @onClick="onClick" v-bind="$props">
      <h2>Card container component</h2>
      <p>You can put here everything you want</p>
    </ BaseCardContainer>`
});

export const Default = Template.bind({});
Default.args = {
};


export const Dark = Template.bind({});
Dark.args = {
  dark: true
};
