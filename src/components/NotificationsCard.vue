<template>
  <v-row class="d-flex">
    <v-col>
      <BaseCardContainer class="notification-card-height">
        <v-row class="px-6 pt-4" align="center">
          <h3 class="title">Notificaciones</h3>
        </v-row>
        <v-row >
          <v-col cols="2" class="d-flex justify-center">
            <v-chip color="blue lighten-1">
              Venta
            </v-chip>
          </v-col>
          <v-col cols="8">
            <p>Fulano de tal espera que le transfieras 00 de oro</p>
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <v-btn text small color="error"><b>Ver operación</b></v-btn>
          </v-col>
        </v-row>
      </BaseCardContainer>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/BaseCardContainer.vue";

@Component({
  components: {
    BaseCardContainer,
  },
})
export default class NotificationsCard extends Vue {
}
</script>

<style lang="sass" scoped>
.notification-card-height
  height: 160px

</style>