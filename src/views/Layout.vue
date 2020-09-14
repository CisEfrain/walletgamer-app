<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;800&display=swap');

#app {
  background-color: #f3f3f3;
  font-family: "Nunito Sans", sans-serif;
}
.custom-divider {
  height: 2.6px;
  max-width: 40%;
  background-color: #c7c4c4e3;
  margin: auto;
}
@media (max-width: 768px) {
  .custom-divider {
    max-width: 80%;
  }
}
</style>