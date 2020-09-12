<template>
  <v-app>
<!--     <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
   
    </v-app-bar> -->

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
