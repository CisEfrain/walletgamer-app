<template>
  <v-container class="mt-8 px-12">
    <v-row class="px-4">
      <h2 class="title">Mis datos</h2>
    </v-row>
    <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="6" sm="6" md="3">
       <v-select
          :items="[]"
          label="Tipo"
          outlined
          rounded
          color="rgba(184,12,70,.6)"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="4">
        <v-text-field
          placeholder="Correo electrónico receptor"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Alias para identificación"
          rounded
          color="rgba(184,12,70,.6)"
          background-color="white"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex justify-center btn-request-mt-less" cols="6" sm="6" md="2">
        <v-btn
        rounded
        color="btn-gradient"
        class="button button--primary button--medium px-8"
        ><b>
          Agregar
        </b>
      </v-btn>
      </v-col>
    </v-row>
    <v-row class="px-4 mt-4">
      <UserExpenditureItemList
        alias="Alias aqui"
        pay_method="PayPal"
      />
      <UserExpenditureItemList
        alias="Alias aqui"
        pay_method="PayPal"
      />
      <UserExpenditureItemList
        alias="Alias aqui"
        pay_method="PayPal"
      />
      <UserExpenditureItemList
        alias="Alias aqui"
        pay_method="PayPal"
      />
      <UserExpenditureItemList
        alias="Alias aqui"
        pay_method="PayPal"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import UserExpenditureItemList from "@/components/account/UserExpenditureItemList.vue"

@Component({
  components:{
    UserExpenditureItemList
  }
})
export default class UserInfo extends Vue {}
</script>

<style lang="sass" scoped>
.mb-less
  margin-bottom: -24px!important

.btn-request-mt-less
  margin-top: -28px

.btn-gradient
  background: $button-gradient
  color: $background!important
</style>
