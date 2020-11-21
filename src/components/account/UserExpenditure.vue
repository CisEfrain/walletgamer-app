<template>
  <v-container class="mt-8 px-12">
    <v-row class="px-4">
      <h2 class="title">Medios de desembolso</h2>
    </v-row>

    <v-row align="center" justify="center" class="mt-6">
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-select
          :items="paymentMethods"
          label="Tipo"
          outlined
          v-model="$v.typeExpenditure.$model"
          :error-messages="typeExpenditureErrors"
          @input="$v.typeExpenditure.$touch()"
          @blur="$v.typeExpenditure.$touch()"
          required
          rounded
          color="rgba(184,12,70,.6)"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Correo electrónico receptor"
          rounded
          v-model="$v.emailReceptor.$model"
          :error-messages="emailReceptorErrors"
          @input="$v.emailReceptor.$touch()"
          @blur="$v.emailReceptor.$touch()"
          required
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
          v-model="$v.aliasId.$model"
          :error-messages="aliasIdErrors"
          @input="$v.aliasId.$touch()"
          @blur="$v.aliasId.$touch()"
          required
          color="rgba(184,12,70,.6)"
          background-color="white"
          ref="aliasId"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="6" sm="6" md="3">
        <v-text-field
          placeholder="Descripcion"
          rounded
          v-model="$v.description.$model"
          :error-messages="descriptionErrors"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
          required
          color="rgba(184,12,70,.6)"
          background-color="white"
          ref="description"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex btn-request-mt-less" cols="6" sm="6" md="2">
        <v-btn
          rounded
          color="btn-gradient"
          class="button button--primary button--medium px-6"
          @click="addExpenditure"
          :disabled="isDisabled"
          ><b>
            Agregar
          </b>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="px-4 mt-4">
      <UserExpenditureItemList
        v-for="(payment, $index) in expenditure"
        :alias="payment.alias"
        :pay_method="payment.nombre"
        :email="payment.email"
        :id="payment.id"
        :descripcion="payment.descripcion"
        :key="$index"
        @click="deleteMethod($index, payment.id)"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import UserExpenditureItemList from "@/components/account/UserExpenditureItemList.vue";
import { Validate } from "vuelidate-property-decorators";

import { required, minLength, email } from "vuelidate/lib/validators";

@Component({
  components: {
    UserExpenditureItemList
  }
})
export default class UserExpenditure extends Vue {
  @Validate({ required }) typeExpenditure = null;
  @Validate({ required, minLength: minLength(4) }) description = null;
  @Validate({ required, minLength: minLength(5), email }) emailReceptor = null;
  @Validate({ required, minLength: minLength(3) }) aliasId = null;
  private typesExpenditure: Array<string> = ["Paypal", "Stripe", "GamerCoin"];
  public page = 1;
  //public expenditureList: Array<string> = [];

  get paymentMethods(): any {
    return this.$store.getters.getPayMethodList;
  }
  private addExpenditure(): void {
    const newExpenditure = {
      nombre: this.typeExpenditure,
      alias: this.aliasId,
      email: this.emailReceptor,
      descripcion: this.description
    };
    this.$store.dispatch("setNewExpenditureData", newExpenditure);
    console.log(newExpenditure);
    this.clearForm();
    this.$store.dispatch("getExpenditureData");
  }
  get expenditure(): any {
    return this.$store.getters.getExpenditure;
  }
  private deleteMethod(index: any, id: any): void {
    console.info("delete emitter", id);
    const payload = { index, id };
    console.info("id", id, "index", index);
    console.info(this.expenditure);
    this.$store.dispatch("deleteExpenditureData", payload);
    this.$store.dispatch("getExpenditureData");
  }
  private clearForm(): void {
    this.$v.$reset();
    this.typeExpenditure = null;
    this.emailReceptor = null;
    this.description = null;
    this.aliasId = null;
  }
  get isDisabled(): boolean {
    return !this.typeExpenditure ||
      !this.emailReceptor ||
      !this.aliasId ||
      !this.description
      ? true
      : false;
  }
  get typeExpenditureErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.typeExpenditure.$dirty) return errors;
    // !this.$v.typeExpenditure.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.typeExpenditure.required && errors.push("El campo es requerido");
    return errors;
  }
  get emailReceptorErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.emailReceptor.$dirty) return errors;
    !this.$v.emailReceptor.minLength && errors.push("Minimo de caracteres 5");
    !this.$v.emailReceptor.email && errors.push("Debe ser un correo valido");
    !this.$v.emailReceptor.required && errors.push("El campo es requerido");
    return errors;
  }
  get aliasIdErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.aliasId.$dirty) return errors;
    !this.$v.aliasId.minLength && errors.push("Minimo de caracteres 3");
    !this.$v.aliasId.required && errors.push("El campo es requerido");
    return errors;
  }
  get descriptionErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.description.$dirty) return errors;
    !this.$v.description.minLength && errors.push("Minimo de caracteres 4");
    !this.$v.description.required && errors.push("El campo es requerido");
    return errors;
  }
}
</script>

<style lang="sass" scoped>
.mb-less
  margin-bottom: -24px!important

.btn-request-mt-less
  margin-top: -28px

.btn-gradient
  background: $button-gradient
  color: $background!important

.fade-enter-active,
.fade-leave-active
  transition: opacity .5s
</style>
