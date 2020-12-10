<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-app-bar app color="white" flat height="100">
        <v-container class="py-0 fill-height full-width" fluid>
          <v-row justify="space-between" align="center">
            <v-col cols="3" md="2" sm="12">
              <img
                class="logo-panel-admin"
                src="../../assets/logo.png"
                alt="Logo Admin"
              />
            </v-col>
            <v-col cols="4" md="6" sm="12" justify-space-between>
              <v-row justify="space-between" align="center">
                <v-col class="text-center">
                  <div>Total Ventas</div>
                  <v-chip outlined color="green">
                    1.000.000
                  </v-chip>
                </v-col>
                <v-col class="text-center">
                  <div>Total Comisiones</div>
                  <v-chip outlined color="green">
                    2.000.000
                  </v-chip>
                </v-col>
                <v-col class="text-center">
                  <div>Desembolsos Pendientes</div>
                  <v-chip outlined color="green">
                    3.000.000
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="5"
              md="4"
              sm="12"
              class="d-flex align-center justify-end"
            >
              <v-btn text color="error">
                <router-link to="/admin/" color="error">
                  Ventas
                </router-link>
              </v-btn>
              <v-btn text color="error">
                <router-link to="/admin/desembolsos" color="error">
                  Desembolsos
                </router-link>
              </v-btn>
              <v-btn text color="error">
                <router-link to="/" color="error">
                  GamerApp
                </router-link>
              </v-btn>
              <v-btn text color="error">
                Salir
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>

      <v-container fluid>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <router-view class="bg-grey" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AdminPanel extends Vue {}
</script>
