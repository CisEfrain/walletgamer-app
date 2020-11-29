<template>
  <v-container class="px-8">
    <v-row
      class="animated fadeIn fast px-8"
      justify="space-around"
      align="center"
    >
      <v-col cols="12" sm="12" md="3">
        <!-- <BalanceCard balance="50" actions /> -->
        <BalanceCard :balance="balance" />
      </v-col>
      <v-col cols="12" sm="12" md="3" @click="isFormDisbursement">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Nuevo desembolso" />
      </v-col>
      <v-col cols="12" sm="12" md="3" @click="isFormTransferToFriend">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Transferir a amigo" />
      </v-col>
      <v-col cols="12" sm="12" md="3" @click="isFormFund">
        <!-- <BalanceCard balance="50" actions /> -->
        <ActionsCard actions="Fondear" />
      </v-col>
    </v-row>

    <v-row
      class="px-8 mt-6"
      align="center"
      justify="space-between"
      v-if="pendingOperations.length > 0"
    >
      <v-col cols="12" sm="12" md="6">
        <h3 class="main-title">Mis Operaciones en curso</h3>
      </v-col>
    </v-row>
    <v-row
      class="px-8 mt-6"
      align="center"
      justify="space-between"
      v-if="pendingOperations.length < 1"
    >
      <v-col cols="12" sm="12" md="6">
        <h3 class="main-title">No tienes operaciones en curso</h3>
      </v-col>
    </v-row>

    <v-row class="px-10" justify="center">
      <v-col cols="12">
        <PendingCard
          class="animated fadeIn fast"
          v-for="pendingOperation in pendingOperations"
          :key="pendingOperation.id"
          product="Gold World of Warcraft"
          :transaction_date="pendingOperation.transaccione.createdAt"
          :transaction_id="pendingOperation.transaccione.identificador"
          :cost="pendingOperation.transaccione.monto"
          :status="pendingOperation.transaccione.estado"
          :type="pendingOperation.tipo"
        />
      </v-col>
      <div class="text-center" v-if="totalPendingPages > 1">
        <v-pagination
          v-model="pendingPage"
          :length="totalPendingPages"
          color="#E4445B"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          total-visible="6"
          @input="handlePaginatePending"
        >
        </v-pagination>
      </div>
    </v-row>

    <v-row
      class="px-8 mt-6"
      align="center"
      justify="space-between"
      v-if="doneOperations.length > 1"
    >
      <v-col cols="12" sm="12" md="6">
        <h3 class="main-title">Historial de operaciones</h3>
      </v-col>
    </v-row>
    <v-row
      class="px-8 mt-6"
      align="center"
      justify="space-between"
      v-if="doneOperations.length < 1"
    >
      <v-col cols="12" sm="12" md="6">
        <h3 class="main-title">No tienes operaciones</h3>
      </v-col>
    </v-row>

    <v-row class="px-10" justify="center">
      <v-col cols="12">
        <v-expansion-panels v-model="panel" multiple flat>
          <TransactionItemList
            class="animated fadeIn fast px-8"
            v-for="doneOperation in doneOperations"
            :key="doneOperation.id"
            product="Gold World of Warcraft"
            :transaction_date="doneOperation.transaccione.createdAt"
            :transaction_id="doneOperation.transaccione.identificador"
            :cost="doneOperation.transaccione.monto"
            :status="doneOperation.transaccione.estado"
            :type="doneOperation.tipo"
            :description="doneOperation.transaccione.descripcion"
          />
        </v-expansion-panels>
      </v-col>
      <div class="text-center" v-if="totalDonePages > 1">
        <v-pagination
          v-model="donePage"
          :length="totalDonePages"
          color="#E4445B"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          total-visible="6"
          @input="handlePaginateDone"
        >
        </v-pagination>
      </div>
    </v-row>

    <!-- Side form for "Desembolso" -->
    <v-navigation-drawer
      v-model="drawerDisbursement"
      absolute
      right
      temporary
      width="420"
    >
      <v-container class="px-8">
        <h2 class="title text-center mt-12 mb-3">Solicitar desembolso</h2>
        <v-divider></v-divider>
        <v-row align="center" class="px-8 mt-8" justify="center">
          <v-col cols="12" md="12" align="center">
            <v-text-field
              label="¿Cuánto quieres retirar?"
              type="number"
              rounded
              v-model="$v.mountDisbursement.$model"
              :error-messages="mountDisbursementErrors"
              @input="$v.mountDisbursement.$touch()"
              @blur="$v.mountDisbursement.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field text-center"
              dense
            ></v-text-field>
            <v-select
              :items="myPayMethods"
              label="¿Donde lo quieres recibir?"
              outlined
              v-model="$v.disbursement.$model"
              :error-messages="disbursementErrors"
              @input="$v.disbursement.$touch()"
              @blur="$v.disbursement.$touch()"
              required
              rounded
              color="rgba(184,12,70,.6)"
              class="text-field text-center"
              :hint="`${disbursement.alias} - [${disbursement.nombre}]`"
              item-text="alias"
              item-value="id"
              return-object
              single-line
              dense
            ></v-select>
            <v-btn
              rounded
              @click="newDisbursement"
              :disabled="isDisbursementDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Solicitar</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <!-- Side form for "Transferir a amigo" -->
    <v-navigation-drawer
      v-model="drawerTransferToFriend"
      absolute
      right
      temporary
      width="420"
    >
      <v-container class="px-8">
        <h2 class="title text-center mt-12 mb-3">Transferir a amigo</h2>
        <v-divider></v-divider>
        <v-row align="center" class="px-8 mt-8" justify="center">
          <v-col cols="12" md="12" align="center">
            <v-text-field
              label="¿Cuanto deseas transferir?"
              rounded
              type="number"
              v-model="$v.mountSendToFriend.$model"
              :error-messages="mountSendToFriendErrors"
              @input="$v.mountSendToFriend.$touch()"
              @blur="$v.mountSendToFriend.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field text-center"
              dense
            ></v-text-field>

            <v-text-field
              rounded
              label="¿A quien lo quieres enviar?"
              outlined
              v-model="$v.sendToFriend.$model"
              :error-messages="sendToFriendErrors"
              @input="$v.sendToFriend.$touch()"
              @blur="$v.sendToFriend.$touch()"
              required
              type="email"
              color="rgba(184,12,70,.6)"
              background-color="white"
              class="text-field text-center"
              dense
            ></v-text-field>
            <v-btn
              rounded
              @click="newSendToFriend"
              :disabled="isSendToFriendDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Transferir</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <!-- Side form for "Fondear" -->
    <v-navigation-drawer
      v-model="drawerFund"
      absolute
      right
      temporary
      width="420"
    >
      <v-container class="px-8">
        <h2 class="title text-center mt-12 mb-3">Fondear</h2>
        <v-divider></v-divider>
        <v-row align="center" class="px-8 mt-8" justify="center">
          <v-col cols="12" md="12" align="center">
            <v-text-field
              label="¿Cuanto quieres fondear?"
              rounded
              type="number"
              v-model="$v.mountFund.$model"
              :error-messages="mountFundErrors"
              @input="$v.mountFund.$touch()"
              @blur="$v.mountFund.$touch()"
              required
              color="rgba(184,12,70,.6)"
              background-color="white"
              outlined
              class="text-field text-center"
              dense
            ></v-text-field>
            <v-select
              :items="platformPayMethods"
              label="¿De donde quieres fondear?"
              outlined
              v-model="$v.fund.$model"
              :error-messages="fundErrors"
              @input="$v.fund.$touch()"
              @blur="$v.fund.$touch()"
              required
              rounded
              color="rgba(184,12,70,.6)"
              class="text-center"
              item-text="alias"
              item-value="id"
              return-object
              single-line
              dense
            ></v-select>
            <v-btn
              rounded
              @click="newFund"
              :disabled="isFundDisabled"
              color="btn-gradient"
              class="button button--primary button--medium px-8 mt-6"
            >
              <b>Fondear</b>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import BalanceCard from "@/components/BalanceCard.vue";
import AsideForm from "@/components/transactions/AsideForm.vue";
import ActionsCard from "@/components/ActionsCard.vue";
import NotificationsCard from "@/components/transactions/NotificationsCard.vue";
import TransactionItemList from "@/components/transactions/TransactionItemList.vue";
import PendingCard from "@/components/transactions/PendingCard.vue";

import { Validate } from "vuelidate-property-decorators";
import { required, email } from "vuelidate/lib/validators";
import SocketIo from "socket.io-client";

@Component({
  components: {
    BalanceCard,
    NotificationsCard,
    TransactionItemList,
    ActionsCard,
    PendingCard,
    AsideForm
  }
})
export default class Transactions extends Vue {
  private panel: Array<number> = [];
  private stripe = (window as any).Stripe(process.env.VUE_APP_STRIPE_PK);
  io: any = SocketIo;
  private drawerDisbursement = false;
  private drawerTransferToFriend = false;
  private drawerFund = false;
  public donePage = 1;
  public pendingPage = 1;

  //New disbursement
  // eslint-disable-next-line no-undef
  @Validate({ required }) disbursement: any = { id: 0 };
  @Validate({ required }) mountDisbursement;

  //Send to friend
  @Validate({ required, email }) sendToFriend = "";
  @Validate({ required }) mountSendToFriend = "";

  //Fund
  @Validate({ required }) fund = "";
  @Validate({ required }) mountFund = "";

  private isFormDisbursement(): void {
    this.drawerDisbursement = true;
    console.info("clicked from trans", this.drawerDisbursement);
  }
  private isFormTransferToFriend(): void {
    this.drawerTransferToFriend = true;
    console.info("clicked from trans", this.drawerTransferToFriend);
  }
  private isFormFund(): void {
    this.drawerFund = true;
    console.info("clicked from trans", this.drawerFund);
  }

  private handlePaginateDone(e): void {
    console.info(e);
    this.donePage = e;
    this.$store.dispatch("MyDoneOperations", { size: 4, page: e - 1 });
  }
  get totalDonePages(): number {
    return Math.ceil(this.$store.getters.getTotalDoneOperations / 4);
  }
  private handlePaginatePending(e): void {
    console.info(e);
    this.pendingPage = e;
    this.$store.dispatch("MyPendingOperations", { size: 4, page: e - 1 });
  }
  get totalPendingPages(): number {
    console.log(this.$store.getters.getTotalPendingOperations);
    return Math.ceil(this.$store.getters.getTotalPendingOperations / 4);
  }
  async beforeCreate() {
    const loader = this.$loading.show();
    await this.$store.dispatch("MyBalance");
    await this.$store.dispatch("getExpenditureData");
    await this.$store.dispatch("MyDoneOperations", { size: 4, page: 0 });
    await this.$store.dispatch("MyPendingOperations", { size: 4, page: 0 });
    loader.hide();
  }
  created() {
    // Socket.on("connect", () => {});
    const Socket = this.io("http://localhost:8080");
    Socket.on("connect", () => {
      console.log("conectado a socket");
    });
  }

  get myPayMethods(): Array<any> {
    console.info(this.$store.getters.getExpenditure, "GetMyPayMethods");
    const payAliases = this.$store.getters.getExpenditure.map((item: any) => ({
      nombre: item.nombre,
      alias: item.alias,
      // eslint-disable-next-line @typescript-eslint/camelcase
      id: item.id
    }));
    console.info(payAliases);
    return payAliases;
  }

  get platformPayMethods(): Array<any> {
    console.info(this.$store.getters.getPayMethodList, "GetPlatformPayMethods");
    return this.$store.getters.getPayMethodList;
  }

  get balance(): string {
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 }).format(
      this.$store.getters.getBalance
    );
  }

  // getter to complete operations
  get doneOperations(): Array<any> {
    console.info(this.$store.getters.getDoneOperations);
    return this.$store.getters.getDoneOperations;
  }
  // getter to pending operations
  get pendingOperations(): Array<any> {
    console.info(this.$store.getters.getPendingOperations);
    return this.$store.getters.getPendingOperations;
  }

  // Dispatch actions to new disbursement
  private newDisbursement() {
    console.info("ADD disbursement");
    const disbursement = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      pasarela_id: this.disbursement.id,
      monto: parseInt(this.mountDisbursement)
    };
    console.info(disbursement);
    this.$store.dispatch("AddDisbursement", disbursement);
    setTimeout(() => {
      this.$store.dispatch("MyDoneOperations", { size: 4, page: 0 });
      this.$store.dispatch("MyPendingOperations", { size: 4, page: 0 });
      this.$store.dispatch("MyBalance");
    }, 700);
    this.drawerDisbursement = false;
  }
  get isDisbursementDisabled(): boolean {
    return !this.disbursement || !this.mountDisbursement ? true : false;
  }

  // Dispatch actions to transfer to friend
  private newSendToFriend() {
    const transferToFriend = {
      beneficiario: this.sendToFriend,
      monto: this.mountSendToFriend
    };
    this.$store.dispatch("MyDoneOperations", { size: 4, page: 0 });
    this.$store.dispatch("TransferToFriend", transferToFriend);
    this.$store.dispatch("MyBalance");
    this.drawerTransferToFriend = false;
  }
  get isSendToFriendDisabled(): boolean {
    return this.sendToFriend.length < 7 ||
      !this.$v.sendToFriend.email ||
      !this.mountSendToFriend
      ? true
      : false;
  }

  // Dispatch actions to make a fund
  private newFund() {
    console.info("ADD fund");
    this.$store.dispatch("createFound", {
      pasarela: this.fund,
      monto: this.mountFund,
      method: this.stripe
    });
    this.$store.dispatch("MyDoneOperations", { size: 4, page: 0 });
    this.$store.dispatch("MyPendingOperations", { size: 4, page: 0 });
  }
  get isFundDisabled(): boolean {
    return !this.fund || !this.mountFund ? true : false;
  }

  // Disbursement handle input errors
  get disbursementErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.disbursement.$dirty) return errors;
    !this.$v.disbursement.required && errors.push("El campo es requerido");
    return errors;
  }

  get mountDisbursementErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.mountDisbursement.$dirty) return errors;
    !this.$v.mountDisbursement.required && errors.push("El campo es requerido");
    return errors;
  }

  // Send to friend handle input errors
  get sendToFriendErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.sendToFriend.$dirty) return errors;
    !this.$v.sendToFriend.required && errors.push("El campo es requerido");
    !this.$v.sendToFriend.email && errors.push("Debe ser un email valido");
    return errors;
  }

  get mountSendToFriendErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.mountSendToFriend.$dirty) return errors;
    !this.$v.mountSendToFriend.required && errors.push("El campo es requerido");
    return errors;
  }

  // Fund handle input errors
  get fundErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.fund.$dirty) return errors;
    !this.$v.fund.required && errors.push("El campo es requerido");
    return errors;
  }

  get mountFundErrors(): Array<string> {
    const errors: Array<string> = [];
    if (!this.$v.mountFund.$dirty) return errors;
    !this.$v.mountFund.required && errors.push("El campo es requerido");
    return errors;
  }
}
</script>

<style scoped lang="sass"></style>
