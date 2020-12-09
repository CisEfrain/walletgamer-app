  <template>

   <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col

        cols="12"
        sm="10"
      >

    <v-data-table
      :headers="headers"
      :items="items"
    >
  <template v-slot:item.desembolso.codigo_transferencia="props">
        <v-edit-dialog
          :return-value.sync="props.item.codigo_transferencia"
          @save="save(props.item.codigo_transferencia)"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.codigo_transferencia}}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.codigo_transferencia"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template> 
    </v-data-table>

    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snack = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AllDisbursement } from "@/services/disbursement.service"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
@Component()
export default class AdminDisbursement extends Vue {
 
        snack= false;
        snackColor= "";
        snackText= "";
        max25chars= v => v && v.length  <= 25 || "Input too long!";
        pagination= {};
        items= [];
        headers= [
          {
            text: "FECHA",
            align: "center",
            sortable: false,
            value: "desembolso.createdAt",
          },
          {
            text:"ID TRANSACCION",
            align: "center",
            sortable: false,
            value: "transaccione.id",
          },
          {
            text:"PASARELA",
            align: "center",
            sortable: false,
            value: "desembolso.pasarela.nombre",
          },
          {
            text:"DESTINO",
            align: "center",
            sortable: false,
            value: "desembolso.pasarela.email",
          },
          {
            text:"MONTO",
            align: "center",
            sortable: false,
            value: "transaccione.monto",
          },
          {
            text:"REFERENCIA",
            align: "center",
            sortable: false,
            value: "desembolso.codigo_transferencia",     
          }
        ];
        log(data){
            console.log("log ", data)
        }
      created(){
      AllDisbursement()
      .then(res => {
          this.items = res.data.data.rows
          console.log(this.items)
      })
      .catch(err => console.error("all disbursement ", err ))
    }
      save (reference) {
        this.snack = true
        this.snackColor = "success"
        this.snackText = "Data saved"
        this.log(reference)
      }
      cancel () {
        this.snack = true;
        this.snackColor = "error";
        this.snackText = "Canceled";
      }
      open () {
        this.snack = true;
        this.snackColor = "info";
        this.snackText = "Dialog opened";
      }
      close () {
        console.log("Dialog closed");
      }
    }

</script>
