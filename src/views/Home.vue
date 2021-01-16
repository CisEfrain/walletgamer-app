<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <BaseButton label="Test Button" backgroundColor="steelblue" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/base/BaseButton.vue";

@Component({
  components: {
    BaseButton
  }
})
export default class Home extends Vue {}
</script>
