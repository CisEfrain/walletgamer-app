<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row justify="space-between" align="center">
          <v-col cols="4" md="3" sm="12">Desembolsos</v-col>
          <v-col cols="4" md="3" sm="12">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Filtrar"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="allDisbursement"
        :search="search"
      >
        <template v-slot:item.createdAt="{ item }">{{
          new Date(item.createdAt).toLocaleDateString()
        }}</template>

        <template v-slot:item.transaccione.identificador="{ item }">
          <v-tooltip open-on-click top color="red lighten-1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="copyId(item.transaccione.identificador)"
                rounded
                elevation="0"
                text
                v-bind="attrs"
                v-on="on"
                color="blue-grey lighten-5"
              >
                <v-icon color="red lighten-1">
                  mdi-identifier
                </v-icon>
              </v-btn>
            </template>
            <span>{{ item.transaccione.identificador }}</span>
          </v-tooltip>
        </template>

        <template v-slot:item.transaccione.monto="{ item }">{{
          "$" +
            new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 1
            }).format(item.transaccione.monto)
        }}</template>

        <template v-slot:item.transaccione.estado="{ item }">
          <v-chip color="blue-grey lighten-5">
            <v-icon :color="getColor(item.transaccione.estado)" left>
              mdi-information-outline
            </v-icon>
            {{ item.transaccione.estado }}
          </v-chip>
        </template>

        <template v-slot:item.desembolso.codigo_transferencia="{ item }">
          <div>
            <v-edit-dialog
              :return-value.sync="item.desembolso.codigo_transferencia"
              @save="
                save(item.desembolso.codigo_transferencia);
                sendNotification(item);
              "
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              <v-chip class="text-center" color="blue-grey lighten-5">
                <v-icon
                  :color="getStatusColor(item.desembolso.codigo_transferencia)"
                  v-show="item.desembolso.codigo_transferencia"
                >
                  mdi-check-circle-outline
                </v-icon>
                <v-icon
                  :color="getStatusColor(item.desembolso.codigo_transferencia)"
                  v-show="!item.desembolso.codigo_transferencia"
                >
                  mdi-information-outline
                </v-icon>
                <!-- {{ item.desembolso.codigo_transferencia || "Notificar" }} -->
              </v-chip>
              <template v-slot:input>
                <v-text-field
                  v-model="item.codigo_transferencia"
                  :rules="[max25chars]"
                  label="Codigo Transferencia"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class AdminDisbursement extends Vue {
  public search = "";
  snack = false;
  snackColor = "";
  snackText = "";
  max25chars = v => (v && v.length <= 25) || "Input too long!";
  pagination = {};
  items = [];
  headers = [
    {
      text: "Fecha",
      align: "center",
      sortable: true,
      value: "createdAt"
    },
    {
      text: "ID transacción",
      align: "center",
      sortable: false,
      value: "transaccione.identificador"
    },
    {
      text: "Monto",
      align: "center",
      sortable: false,
      value: "transaccione.monto"
    },
    {
      text: "Usuario",
      align: "center",
      sortable: false,
      value: "desembolso.pasarela.email"
    },
    {
      text: "Medio de desembolso",
      align: "center",
      sortable: false,
      value: "desembolso.pasarela.nombre"
    },
    {
      text: "Email Receptor",
      align: "center",
      sortable: false,
      value: "desembolso.pasarela.email"
    },
    {
      text: "Descripción/Detalle",
      align: "center",
      sortable: false,
      value: "desembolso.pasarela.descripcion"
    },
    {
      text: "Estado",
      align: "center",
      sortable: true,
      value: "transaccione.estado"
    },
    {
      text: "Notificar Transferencia",
      align: "center",
      sortable: true,
      value: "desembolso.codigo_transferencia"
    }
  ];
  created() {
    this.$store.dispatch("getAllDisbursement");
  }

  private sendNotification({ codigo_transferencia, desembolso }): void {
    console.info({ codigo_transferencia, desembolso });
    const payload = {
      codigo_transferencia,
      id: desembolso.operacion_id
    };
    this.$store.dispatch("updateDisbursement", payload);
  }
  private save(item) {
    console.info(item);
    this.snack = true;
    this.snackColor = "success";
    this.snackText = "Data saved";
  }
  private cancel() {
    this.snack = true;
    this.snackColor = "error";
    this.snackText = "Canceled";
  }
  private open() {
    this.snack = true;
    this.snackColor = "info";
    this.snackText = "Dialog opened";
  }
  private close() {
    console.log("Dialog closed");
  }

  private copyId(id) {
    const el = document.createElement("textarea");
    el.value = id;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    console.info(id);
  }

  getColor(item) {
    if (item == "Pendiente") return "amber";
    if (item == "Completada") return "green accent-3";
    else return "grey darken-1";
  }

  getStatusColor(item) {
    if (item !== null) return "green accent-3";
    else return "light-blue darken-3";
  }

  get allDisbursement(): Array<any> {
    return this.$store.getters.getDisbursement;
  }
}
</script>
