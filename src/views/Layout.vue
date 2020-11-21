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

<style lang="sass">
#app
  background-color: #f3f3f3
  font-family: $body-font-family

.custom-divider
  height: 2.4px
  max-width: 100%
  background-color: #c7c5c59a

  border: none

@media (max-width: 768px)
  .custom-divider
    max-width: 80%
</style>