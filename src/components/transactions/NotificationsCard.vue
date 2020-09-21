<template>
  <v-row class="d-flex justify-center">
      <BaseCardContainer class="notification-card-height">
        <v-row class="px-6 pt-4" align="center" >
          <h3 class="title">Notificaciones</h3>
        </v-row>
        <v-row class="px-4" align="center" justify="center">
          <v-col cols="4" sm="3" md="2" class="d-flex justify-center">
            <v-chip color="blue lighten-1">
              <small>Venta</small>
            </v-chip>
          </v-col>
          <v-col cols="6" sm="6" md="7">
            <p class="notification-p">Fulano de tal espera que le transfieras 00 de oro</p>
          </v-col>
          <v-col cols="12" sm="12" md="3" class="d-flex justify-center">
            <v-btn text color="error"><b><small>Ver operación</small></b></v-btn>
          </v-col>
        </v-row>
      </BaseCardContainer>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import BaseCardContainer from "@/components/base/BaseCardContainer.vue";

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
  min-height: 160px

p
  margin-bottom: 0

.notification-p
  font-size: .9em
</style>