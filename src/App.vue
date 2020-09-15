<template>
  <v-app>
    <!--     <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
   
    </v-app-bar>-->

    <v-main>
      <layout />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/views/Layout.vue";

export default Vue.extend({
  name: "App",

  components: {
    Layout
  },

  data: () => ({
    //
  })
});
</script>
 <style lang="sass">
@import './scss/variables.scss'
.title
  color: $title
.links
  color: $card-link
.theme-button
  background: $button-gradient
</style>