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
    this.$emit("onClick");
  }
}
</script>

<style lang="sass" scoped>
.button 
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial,
  sans-serif
  font-weight: 800
  border: 0
  border-radius: 3em
  cursor: pointer
  display: inline-block
  padding: 8px
  font-size: 16px !important
  line-height: 0.6
  min-width: 140px
  color: rgb(71, 69, 69)
  -webkit-box-shadow: 0px 5px 18px -12px rgba(223, 83, 83, 1)
  -moz-box-shadow: 0px 5px 18px -12px rgba(223, 83, 83, 1)
  box-shadow: 0px 5px 18px -12px rgba(223, 83, 83, 1)

.button--primary 
  color: rgb(252, 248, 248)
  background: rgb(223, 83, 83)
  background: linear-gradient(90deg,rgba(223, 83, 83, 1) 0%, rgba(184, 12, 70, 1) 84% )

.button--secondary 
  color: rgba(184, 12, 70, 1)
  background-color: transparent
  box-shadow: rgba(184, 12, 70, 1) 0px 0px 0px 1.5px inset

.button--dark 
  color: white
  background: rgb(54, 53, 53)
  background: linear-gradient(  90deg,  rgba(54, 53, 53, 1) 0%,  rgba(41, 38, 38, 1) 91%)

.button--light
  color: rgb(71, 69, 69)
  background: rgb(226, 217, 217)
  background: linear-gradient(  90deg,  rgba(226, 217, 217, 1) 0%,  rgba(233, 189, 204, 1) 84%)

.button--small 
  font-size: 12px
  padding: 8px
  min-width: 100px

.button--medium 
  font-size: 14px
  padding: 12px 20px

.button--full 
  width: 100%
  text-align: center
  padding: 12px 24px
</style>
