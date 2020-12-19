<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-app-bar app color="white" flat height="100">
        <v-container class="py-0 fill-height full-width" fluid>
          <v-row justify="space-between" align="center">
            <v-col cols="3" md="2" sm="3">
              <img
                class="logo-panel-admin"
                src="../../assets/logo.png"
                alt="Logo Admin"
              />
            </v-col>
            <v-col
              align-self="center"
              class="mt-less-4"
              cols="4"
              md="6"
              sm="12"
              justify-space-between
            >
              <v-row justify="space-between" align="center">
                <v-col class="text-center">
                  <div>Total Ventas</div>
                  <v-chip color="blue-grey lighten-5">
                    <b class="balance">1.000.000</b>
                  </v-chip>
                </v-col>
                <v-col class="text-center">
                  <div>Total Comisiones</div>
                  <v-chip color="blue-grey lighten-5">
                    <b class="balance">2.000.000</b>
                  </v-chip>
                </v-col>
                <v-col class="text-center">
                  <div>Desembolsos Pendientes</div>
                  <v-chip color="blue-grey lighten-5">
                    <b class="balance">3.000.000</b>
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="5"
              md="4"
              sm="4"
              class="d-flex align-center justify-end isMobile"
            >
              <v-btn text color="error" class="isMobile">
                <router-link to="/admin/" color="error">
                  Ventas
                </router-link>
              </v-btn>
              <v-btn text color="error" class="isMobile">
                <router-link to="/admin/desembolsos" color="error">
                  Desembolsos
                </router-link>
              </v-btn>
              <!-- <v-btn text color="error">
                <router-link to="/" color="error">
                  GamerApp
                </router-link>
              </v-btn> -->
              <v-btn @click="logout" text color="error" class="isMobile">
                Salir
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>

      <v-container fluid>
        <v-row>
          <v-col>
            <v-sheet min-height="40vh" rounded="lg">
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-navigation-drawer width="240px" app v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-content class="mb-5">
            <img
              class="logo-panel"
              src="../../assets/logo.png"
              alt="Logo Admin"
            />
          </v-list-item-content>
        </v-list-item>
        <router-link to="/admin/desembolsos">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Desembolsos</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/admin">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Ventas</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item link @click="logout">
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-fab-transition>
      <v-btn
        fab
        absolute
        bottom
        right
        class="burger-menu-responsive btn-gradient"
        @click="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AdminPanel extends Vue {
  public drawer = false;
  public logout(): void {
    this.$toast.success(`Hasta la proxima`);
    localStorage.clear();
    this.$router.push("/login");
    this.$store.commit("resetUserData");
    console.info("logout");
  }
}
</script>
<style lang="sass" scoped>
#inspire > div > main
 padding-top: 30px!important

.balance
  color: #00E676

.v-navigation-drawer
 display: none

@media (max-width: 768px)
  .isMobile
    display: none
  .mt-less-4
    margin-top: -2em
    margin-left: -2em
  .v-navigation-drawer
    display: block
</style>
