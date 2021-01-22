<template>
  <v-app id="inspire" class="bg-grey">
    <v-navigation-drawer width="216px" app v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-content class="mb-5">
            <img class="logo-panel" src="../assets/logo.png" alt="Logo Admin" />
          </v-list-item-content>
        </v-list-item>
        <Avatar />
        <router-link to="/">
          <v-list-item link @click="resetProduct">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Operaciones</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/sell">
          <v-list-item link @click="resetProduct">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Vender</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/buy">
          <v-list-item link @click="resetProduct">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Comprar</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link to="/account">
          <v-list-item link @click="resetProduct">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Mi cuenta</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/help">
          <v-list-item link @click="resetProduct">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Ayuda</v-list-item-title
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
      <v-list>
        <!-- <v-list-item>
          <v-list-item-content class="mb-5">
            <img class="logo-panel" src="../assets/logo.png" alt="Logo Admin" />
          </v-list-item-content>
        </v-list-item>
        <router-link to="/admin/desembolsos">
          <v-list-item link @click="resetProduct">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase"
                >Desembolsos</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/admin/ventas">
          <v-list-item link @click="resetProduct">
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
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <router-view class="bg-grey" />
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
    <!-- {{ $store.getters.adminInfo }} -->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Avatar from "@/components/Avatar.vue";

@Component({
  components: {
    Avatar
  }
})
export default class Panel extends Vue {
  public drawer = null;
  public logout(): void {
    this.$toast.success(`Hasta la proxima`);
    localStorage.clear();
    this.$router.push("/login");
    this.$store.commit("resetUserData");
    console.info("logout");
  }
  private resetProduct(): void {
    this.$store.commit("resetProduct");
  }

  created() {
    this.$store.dispatch("getData");
    this.$store.dispatch("setUserData");
  }
}
</script>

<style lang="sass">

#inspire > div > button.burger-menu-responsive
  z-index: 300
  position: fixed
  bottom: 8%
  right: 4%
  display: none

#inspire > div > header
  height: 60px
  margin-top: 0px
  transform: translateY(0px)
  left: 0px
  right: 0px
  margin-left: 80%
  margin-bottom: 5%
  background-color: transparent
  border: none
  box-shadow: none
  width: 150px
  display: none

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
  #inspire > div > button.burger-menu-responsive
    display: block
</style>
