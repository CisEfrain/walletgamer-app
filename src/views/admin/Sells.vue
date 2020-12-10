<template>
  <div>
    <template>
      <div>
        <v-data-table :headers="headers" :items="desserts">
          <template v-slot:item.name="props">
            <v-edit-dialog
              :return-value.sync="props.item.name"
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              {{ props.item.name }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.name"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.iron="props">
            <v-edit-dialog
              :return-value.sync="props.item.iron"
              large
              persistent
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              <div>{{ props.item.iron }}</div>
              <template v-slot:input>
                <div class="mt-4 title">
                  Update Iron
                </div>
                <v-text-field
                  v-model="props.item.iron"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
        </v-data-table>

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
  </div>
</template>
<script>
/* eslint-disable @typescript-eslint/camelcase */
import { AllDisbursement } from "@/services/disbursement.service";
export default {
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: v => v.length <= 25 || "Input too long!",
      pagination: {},
      headers: [
        {
          text: "Fecha",
          align: "center",
          sortable: true,
          value: "fecha"
        },
        {
          text: "ID transacción",
          align: "center",
          sortable: true,
          value: "id_transaccion"
        },
        {
          text: "Cantidad",
          align: "center",
          sortable: true,
          value: "cantidad"
        },
        { text: "Tipo", align: "center", sortable: true, value: "tipo" },
        { text: "Monto", align: "center", sortable: true, value: "monto" },
        {
          text: "Comisión",
          align: "center",
          sortable: true,
          value: "comision"
        },
        {
          text: "Comprador",
          align: "center",
          sortable: true,
          value: "comprador"
        },
        {
          text: "Vendedor",
          align: "center",
          sortable: true,
          value: "vendedor"
        },
        { text: "Estado", align: "center", sortable: true, value: "estado" },
        {
          text: "Cambiar Estado",
          align: "center",
          sortable: true,
          value: "cambiar_estado"
        }
      ],
      desserts: [
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        },
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        },
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        },
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        },
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        },
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        },
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        },
        {
          fecha: "Frozen Yogurt",
          id_transaccion: 159,
          cantidad: 6.0,
          tipo: 24,
          monto: 4.0,
          comision: "1%",
          comprador: "1%",
          vendedor: "1%",
          estado: "1%",
          cambiar_estado: "1%"
        }
      ]
    };
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    }
  },
  created() {
    AllDisbursement()
      .then(res => console.log("res ", res))
      .catch(err => console.error("all disbursement ", err));
  }
};
</script>
