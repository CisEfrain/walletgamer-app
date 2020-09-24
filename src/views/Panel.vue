<template>
  <v-app id="inspire">
    <v-navigation-drawer width="200px" app>
      <v-list>
        <v-list-item>
          <v-list-item-content class="mb-16">
            <img class="logo" src="../assets/logo.png" alt="Logo Admin" />
          </v-list-item-content>
        </v-list-item>
        <router-link to="/">
          <v-list-item link @click="resetProduct">
            <!-- <v-list-item-action>
              <v-icon>mdi-account-details</v-icon>
            </v-list-item-action>-->
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/sell">
          <v-list-item link @click="resetProduct">
            <!-- <v-list-item-action>
              <v-icon>mdi-shopping</v-icon>
            </v-list-item-action>-->
            <v-list-item-content>
              <v-list-item-title>Vender</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/buy">
          <v-list-item link @click="resetProduct">
            <!-- <v-list-item-action>
              <v-icon>mdi-account-check</v-icon>
            </v-list-item-action>-->
            <v-list-item-content>
              <v-list-item-title>Comprar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/wallet">
          <v-list-item link @click="resetProduct">
            <!-- <v-list-item-action>
              <v-icon>mdi-store</v-icon>
            </v-list-item-action>-->
            <v-list-item-content>
              <v-list-item-title>Mi wallet</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/account" >
          <v-list-item link @click="resetProduct">
            <!-- <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>-->
            <v-list-item-content>
              <v-list-item-title>Mi cuenta</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/help" >
          <v-list-item link @click="resetProduct">
            <!-- <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>-->
            <v-list-item-content>
              <v-list-item-title >Ayuda</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item link @click="logout">
          <!-- <v-list-item-action>
            <v-icon>mdi-power-settings</v-icon>
          </v-list-item-action>-->
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Wallet Gaming</v-toolbar-title>
    </v-app-bar>-->

    <v-container class="bg-grey">
      <router-view />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Panel extends Vue {
  private logout(): void{
    this.$router.push('/login')
  }
  private resetProduct(): void{
    this.$store.commit("resetProduct")
  }
}
</script>

<style lang="sass">
.bg-grey
  background-color: #f3f3f3
  border: none
  height: 100%

.custom-divider
  height: 2.4px
  max-width: 48%
  background-color: #c7c5c59a
  margin: auto
  border: none

@media (max-width: 768px)
  .custom-divider
    max-width: 80%

</style>