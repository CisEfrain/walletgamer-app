<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  //Props
  @Prop({ required: false, type: String }) readonly label!: string;
  @Prop({
    required: false,
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary", "dark", "light"].indexOf(value) !== -1;
    }
  })
  readonly color!: string;
  @Prop({
    required: false,
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "full"].indexOf(value) !== -1;
    }
  })
  readonly size!: string;
  @Prop({ type: String }) readonly backgroundColor!: string;

  //Computed
  get classes(): any {
    return {
      button: true,
      // "button--primary": this.primary,
      // "button--secondary": !this.primary,
      [`button--${this.color}`]: true,
      [`button--${this.size}`]: true
    };
  }

  get style(): any {
    return {
      backgroundColor: this.backgroundColor
    };
  }

  //Methods
  public onClick(): void {
    this.$emit("click");
  }
}
</script>

<style lang="sass" scoped>
 
</style>
