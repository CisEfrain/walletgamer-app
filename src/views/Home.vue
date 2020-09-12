<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <BaseButton label="Test Button" backgroundColor="steelblue" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import BaseButton from "@/components/BaseButton.vue";

@Component({
  components: {
    HelloWorld,
    BaseButton
  }
})
export default class Home extends Vue {}
</script>
