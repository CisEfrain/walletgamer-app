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
.custom-divider {
  height: 2px;
  max-width: 40%;
  margin: auto;
}
@media (max-width: 768px) {
  .custom-divider {
    max-width: 80%;
  }
}
</style>