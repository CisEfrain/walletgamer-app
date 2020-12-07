<template>
  <v-row justify="center">
    <v-col class="text-center mt-6">
      <h2 class="main-title">Soporte</h2>
      <a href="https://walletgamer.com/ayuda/" target="_blank">
        <p>Si necesitas ayuda haz click aquí</p>
      </a>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Help extends Vue {}
</script>

<style lang="sass" scoped>
a
 text-decoration: none
 color: $font-main-color
 font-size: 1.2em
</style>
