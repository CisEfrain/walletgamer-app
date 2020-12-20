<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row justify="space-between" align="center">
          <v-col cols="4" md="3" sm="12">Ventas</v-col>
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
      <v-data-table :headers="headers" :items="allSells">
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

        <template v-slot:item.ventas[0].cantidad="{ item }">
          <span v-if="item.ventas[0].publicacione.tipo === 'oro'"
            >{{ item.ventas[0].cantidad * 100 }} de Oro</span
          >
          <span v-else>{{ item.ventas[0].cantidad * 100 }}</span>
        </template>

        <template v-slot:item.usuario.nombre="{ item }">{{
          item.usuario.nombre
        }}</template>

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

        <template v-slot:item.ventas[0].estado="{ item }">
          <div>
            <v-edit-dialog
              :return-value.sync="item.ventas[0].estado"
              @cancel="cancel"
            >
              <v-chip class="text-center" color="blue-grey lighten-5">
                <v-icon
                  :color="getStatusColor(item.ventas[0].estado)"
                  v-show="item.ventas[0].estado === 'transaccionCompleta'"
                >
                  mdi-check-circle-outline
                </v-icon>
                <v-icon
                  :color="getStatusColor(item.ventas[0].estado)"
                  v-show="item.ventas[0].estado !== 'transaccionCompleta'"
                >
                  mdi-information-outline
                </v-icon>
              </v-chip>
              <template v-slot:input>
                <v-select
                  v-model="item.ventas[0].estado"
                  :items="sellStatus"
                  dense
                  v-if="item.ventas[0].estado !== 'transaccionCompleta'"
                  @change="changeSellStatus(item)"
                ></v-select>
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
export default class AdminSells extends Vue {
  public search = "";
  public sellStatus: string[] = [
    "transaccionCompleta",
    "mediacion",
    "canceladaStock",
    "canceladaIncumplimiento"
  ];
  public sellStatusModel = "";
  snack = false;
  snackColor = "";
  snackText = "";
  max25chars = v => v.length <= 25 || "Input too long!";
  pagination = {};
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
      sortable: true,
      value: "transaccione.identificador"
    },
    {
      text: "Cantidad",
      align: "center",
      sortable: true,
      value: "ventas[0].cantidad"
    },
    { text: "Tipo", align: "center", sortable: false, value: "tipo" },
    {
      text: "Monto",
      align: "center",
      sortable: true,
      value: "transaccione.monto"
    },
    {
      text: "Comisión",
      align: "center",
      sortable: true,
      value: "comisione.monto"
    },
    {
      text: "Comprador/Vendedor",
      align: "center",
      sortable: true,
      value: "usuario.nombre"
    },
    // {
    //   text: "Vendedor",
    //   align: "center",
    //   sortable: true,
    //   value: "vendedor"
    // },
    {
      text: "Estado",
      align: "center",
      sortable: true,
      value: "transaccione.estado"
    },
    {
      text: "Cambiar Estado",
      align: "center",
      sortable: true,
      value: "ventas[0].estado"
    }
  ];

  created() {
    this.$store.dispatch("getAllSells");
  }

  get allSells(): Array<any> {
    return this.$store.getters.getSells;
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

  private changeSellStatus(item) {
    const payload = {
      id: item.ventas[0].id,
      estado: item.ventas[0].estado
    };
    console.info(payload);
    this.$store.dispatch("updateSell", payload);
  }
  getColor(item) {
    if (item == "Pendiente") return "amber";
    if (item == "Completada") return "green accent-3";
    else return "grey darken-1";
  }

  getStatusColor(item) {
    if (item !== "transaccionCompleta") return "amber";
    if (item == "transaccionCompleta") return "green accent-3";
  }

  private save() {
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
}
</script>
