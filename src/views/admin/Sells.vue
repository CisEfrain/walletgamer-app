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

        <template
          v-slot:item.operaciones[0].transaccione.identificador="{ item }"
        >
          <v-tooltip open-on-click top color="red darken-3">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="copyId(item.operaciones[0].transaccione.identificador)"
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
            <span>{{ item.operaciones[0].transaccione.identificador }}</span>
          </v-tooltip>
        </template>

        <template v-slot:item.cantidad="{ item }">
          <span v-if="item.publicacione.tipo === 'oro'">{{
            item.cantidad * 100
          }}</span>
          <span v-else>{{ item.cantidad * 100 }}</span>
        </template>

        <template v-slot:item.operaciones[0].usuario="{ item }">
          <v-tooltip open-on-click top color="red darken-3">
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                @click="copyUser(item.operaciones[0].usuario)"
                rounded
                elevation="0"
                text
                v-bind="attrs"
                v-on="on"
                color="blue-grey lighten-5"
              >
                {{ item.operaciones[0].usuario.nombre }}
              </v-chip>
            </template>
            <p class="m-0 p-0">
              <b>Usuario:</b> {{ item.operaciones[0].usuario.nombre }}
            </p>
            <p class="m-0 p-0">
              <b>Correo:</b> {{ item.operaciones[0].usuario.email }}
            </p>
            <p class="m-0 p-0">
              <b>Telefono</b> {{ item.operaciones[0].usuario.telefono }}
            </p>
          </v-tooltip>
        </template>

        <template v-slot:item.operaciones[1].usuario="{ item }">
          <v-tooltip open-on-click top color="red darken-3">
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                @click="copyUser(item.operaciones[1].usuario)"
                rounded
                elevation="0"
                text
                v-bind="attrs"
                v-on="on"
                color="blue-grey lighten-5"
              >
                {{ item.operaciones[1].usuario.nombre }}
              </v-chip>
            </template>
            <p class="m-0 p-0">
              <b>Usuario:</b> {{ item.operaciones[1].usuario.nombre }}
            </p>
            <p class="m-0 p-0">
              <b>Correo:</b> {{ item.operaciones[1].usuario.email }}
            </p>
            <p class="m-0 p-0">
              <b>Telefono</b> {{ item.operaciones[1].usuario.telefono }}
            </p>
          </v-tooltip>
        </template>

        <template v-slot:item.operaciones[0].transaccione.monto="{ item }">
          {{
            "$ " +
              new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 1
              }).format(item.operaciones[0].transaccione.monto)
          }}
        </template>

        <template v-slot:item.operaciones[1].comisione.monto="{ item }">
          {{
            "$ " +
              new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 1
              }).format(item.operaciones[1].comisione.monto)
          }}
        </template>

        <template v-slot:item.operaciones[1].transaccione.estado="{ item }">
          <v-chip color="blue-grey lighten-5">
            <v-icon
              :color="getColor(item.operaciones[1].transaccione.estado)"
              left
            >
              mdi-information-outline
            </v-icon>
            {{ item.operaciones[1].transaccione.estado }}
          </v-chip>
        </template>

        <template v-slot:item.estado="{ item }">
          <div>
            <v-edit-dialog :return-value.sync="item.estado" @cancel="cancel">
              <v-chip class="text-center" color="blue-grey lighten-5">
                <v-icon
                  :color="getColor(item.operaciones[1].transaccione.estado)"
                  v-show="
                    item.operaciones[1].transaccione.estado !== 'Pendiente'
                  "
                >
                  mdi-check-circle-outline
                </v-icon>
                <v-icon
                  :color="getColor(item.operaciones[1].transaccione.estado)"
                  v-show="
                    item.operaciones[1].transaccione.estado === 'Pendiente'
                  "
                >
                  mdi-information-outline
                </v-icon>
              </v-chip>
              <template v-slot:input>
                <v-select
                  v-model="item.estado"
                  :items="sellStatus"
                  dense
                  v-if="item.operaciones[1].transaccione.estado === 'Pendiente'"
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
      value: "operaciones[0].transaccione.identificador"
    },
    {
      text: "Cantidad",
      align: "center",
      sortable: true,
      value: "cantidad"
    },
    {
      text: "Tipo",
      align: "center",
      sortable: false,
      value: "publicacione.tipo"
    },
    {
      text: "Monto",
      align: "center",
      sortable: true,
      value: "operaciones[0].transaccione.monto"
    },
    {
      text: "Comisión",
      align: "center",
      sortable: true,
      value: "operaciones[1].comisione.monto"
    },
    {
      text: "Comprador",
      align: "center",
      sortable: true,
      value: "operaciones[0].usuario"
    },
    {
      text: "Vendedor",
      align: "center",
      sortable: true,
      value: "operaciones[1].usuario"
    },
    {
      text: "Estado",
      align: "center",
      sortable: true,
      value: "operaciones[1].transaccione.estado"
    },
    {
      text: "Cambiar Estado",
      align: "center",
      sortable: true,
      value: "estado"
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

  private copyUser(user) {
    const el = document.createElement("textarea");
    el.value = `Nombre: ${user.nombre} - Email: ${user.email} - Telefono: ${user.telefono}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  private changeSellStatus(item) {
    console.info(item.id, item.estado);
    const payload = {
      id: item.id,
      estado: item.estado
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
