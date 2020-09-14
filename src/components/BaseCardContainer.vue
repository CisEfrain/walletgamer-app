<template>
  <section :class="classes" :style="style">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseCardContainer extends Vue {
  //Props
  @Prop({ type: Boolean }) readonly dark!: boolean;
  @Prop({ type: String }) readonly backgroundColor!: string;

  //Computed
  get classes(): any {
    return {
      "card-container": true,
      [`card-container--dark`]: this.dark,
    };
  }

  get style(): any {
    return {
      backgroundColor: this.backgroundColor,
    };
  }
}
</script>

<style scoped>
.card-container {
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-radius: 2em;
  padding: 16px;
  min-width: 120px;
  min-height: 120px;
  color: rgb(71, 69, 69);
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 245, 242, 1) 80%
  );
  -webkit-box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 5px 18px -12px rgba(0, 0, 0, 0.8);
}

.card-container--dark {
  color: white;
  background: rgb(54, 53, 53);
  background: linear-gradient(
    90deg,
    rgba(54, 53, 53, 1) 0%,
    rgba(41, 38, 38, 1) 91%
  );
  -webkit-box-shadow: 0px 5px 18px -12px rgba(250, 235, 238, 1);
  -moz-box-shadow: 0px 5px 18px -12px rgba(250, 235, 238, 1);
  box-shadow: 0px 5px 18px -12px rgba(250, 235, 238, 1);
}
</style>
