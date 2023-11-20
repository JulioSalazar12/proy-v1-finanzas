<template>
  <div class="pa-5 d-flex flex-column align-center">
    <h1>Dashboard VIew</h1>
    <p>Bienvenido al panel de control</p>

    <v-card width="1000" class="pa-5 mt-5" outlined>
      <v-form v-if="showForm" @submit.prevent="submitLoanForm" class="d-flex flex-column">
        <!-- Primera columna -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field outlined dense hide-details class="mb-3" v-model="sellPrice" label="Sell Price" required type="number"></v-text-field>
            <v-select outlined dense hide-details class="mb-3" v-model="paymentPlan" :items="paymentPlanOptions" label="Payment Plan" required></v-select>
            <!-- Agrega más campos aquí según sea necesario -->
            <v-text-field outlined dense hide-details class="mb-3" v-model="initialShare" label="initialShare" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="finalShare" label="finalShare" disabled required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="interestRate" label="interestRate" required type="number"></v-text-field>
      
            <v-select outlined dense hide-details class="mb-3" v-model="interestType" :items="interestTypOptions" label="interestType" required></v-select>
            <v-select outlined dense hide-details class="mb-3" v-model="capitalizationPeriod" :items="capitalizatOptions" label="capitalizationPeriod" required></v-select>
            <v-text-field outlined dense hide-details class="mb-3" v-model="frequencyPayment" label="frequencyPayment" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="daysPerYear" label="daysPerYear" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="notarialCost" label="notarialCost" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="registerCost" label="registerCost" required type="number"></v-text-field>
          </v-col>
    
          <!-- Segunda columna -->
          <v-col cols="12" md="6">
            
            <v-text-field outlined dense hide-details class="mb-3" v-model="tasacion" label="tasacion" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="studyCommission" label="studyCommission" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="activationCommission" label="activationCommission" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="ports" label="ports" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="administrativeWaste" label="administrativeWaste" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="insuranceD" label="insuranceD" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="insuranceRisk" label="insuranceRisk" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="discountRate" label="discountRate" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="nyears" label="nyears" disabled required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="gps" label="gps" required type="number"></v-text-field>
          </v-col>

        </v-row>
        <v-row class="pt-0 mt-0">
          <v-col cols="12" md="12">
            <v-btn class="elevation-0" type="submit" color="primary">Submit</v-btn>
            <v-btn class="elevation-0 ml-3" color="success" @click="showForm = !showForm">Close Form</v-btn>
          </v-col>
        </v-row>
        
      </v-form>
      <v-btn class="elevation-0" v-if="!showForm" color="success" @click="showForm = !showForm">View Form</v-btn>
    </v-card>
    
  <v-card width="1000" class="pa-5 mt-5 elevation-0">
    <div class="d-flex justify-space-between mt-8" style="width: 100%;">
      <span class="mt-3 font-weight-black">ITEMS:</span>
      <v-btn class="elevation-0" color="indigo" dark @click="getAllItems" :loading="loadingItems">Refresh</v-btn>
    </div>
  
    <div v-if="itemsList!=[]" class="d-flex mt-3 flex-wrap justify-center" style="gap: 10px;">
      <v-card :loading="loadingItemSelect.id == item.id && loadingItemSelect.load == true" @click="setDialog(item)" v-for="(item, index) in itemsList" :key="index" outlined class="px-4 pb-4 d-flex flex-column align-start" width="350">
        <h3 class="pt-4">SAMPLE ID: 000-{{ item.id }}</h3>
        <p class="mb-0">sellPrice: {{item.sellPrice}}</p>
        <p class="mb-0">paymentPlan: {{item.paymentPlan}}</p>
        <p class="mb-0">interestType: {{item.interestType}}</p>
        <p class="mb-0">capitalizationPeriod: {{item.capitalizationPeriod}}</p>
      </v-card>
  
    </div>
    
  </v-card>

  <v-dialog v-model="showdialog" width="700">
    <v-card class="pa-4 d-flex flex-column align-start">
      <h3 class="mb-3">SAMPLE ID: 000-{{ itemSelect.id }}</h3>
      <v-row v-if="showFirst" style="width: 100%;">
          <v-col cols="12" md="6">
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.sellPrice" label="Sell Price" required disabled type="number"></v-text-field>
            
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.paymentPlan" label="Payment Plan" required disabled></v-text-field>

            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.initialShare" label="initialShare" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.finalShare" label="finalShare" disabled required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.interestRate" label="interestRate" required disabled type="number"></v-text-field>
      
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.interestType" label="interestType" required disabled></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.capitalizationPeriod" label="capitalizationPeriod" required disabled></v-text-field>

            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.frequencyPayment" label="frequencyPayment" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.daysPerYear" label="daysPerYear" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.notarialCost" label="notarialCost" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.registerCost" label="registerCost" required disabled type="number"></v-text-field>
          </v-col>
    
          <!-- Segunda columna -->
          <v-col cols="12" md="6">
            
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.tasacion" label="tasacion" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.studyCommission" label="studyCommission" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.activationCommission" label="activationCommission" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.ports" label="ports" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.administrativeWaste" label="administrativeWaste" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.insuranceD" label="insuranceD" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.insuranceRisk" label="insuranceRisk" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.discountRate" label="discountRate" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.nyears" label="nyears" disabled required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.gps" label="gps" required disabled type="number"></v-text-field>
          </v-col>

      </v-row>
      <v-row v-else style="width: 100%;">
          <v-col cols="12" md="6">
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.numSharePerYear" label="numSharePerYear" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.totalSharePerYear" label="totalSharePerYear" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.initialShare" label="initialShare" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.finalShare" label="finalShare" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.loanAmount" label="loanAmount" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.finaciarCuotas" label="finaciarCuotas" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.seguroDesgrav" label="seguroDesgrav" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.seguroRiesgo" label="seguroRiesgo" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.interests" label="interests" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.amortizacion" label="amortizacion" required disabled type="number"></v-text-field>
          </v-col>
          
          <!-- Segunda columna -->
          <v-col cols="12" md="6">
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.desgravamen" label="desgravamen" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.seguroTodoRiesgo" label="seguroTodoRiesgo" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.ports" label="ports" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.admGastos" label="admGastos" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.discountRate" label="discountRate" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tir" label="tir" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tcea" label="tcea" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.van" label="van" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tea" label="tea" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tem" label="tem" required disabled type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.gps" label="gps" required disabled type="number"></v-text-field>
          </v-col>

      </v-row>
      <v-row  class="pt-0 mt-0">
        <v-col cols="12" md="12">
          <v-btn class="elevation-0" color="primary" @click="!showFirst">{{showFirst?'Ver':'Ocultar'}} Resultados</v-btn>
        </v-col>
      </v-row>
      <!-- <p class="mb-0">sellPrice: {{itemSelect.sellPrice}}</p>
      <p class="mb-0">paymentPlan: {{itemSelect.paymentPlan}}</p>
      <p class="mb-0">interestType: {{itemSelect.interestType}}</p>
      <p class="mb-0">capitalizationPeriod: {{itemSelect.capitalizationPeriod}}</p> -->
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
  </v-snackbar>


  </div>
</template>

<script>
export default {
  data() {
    return {
      showFirst: true,
      showdialog: false,
      itemSelect:{},
      itemResponse:{},

      showForm: true,

      loadingItemSelect: {
        id: '',
        load: false,
      },
      loadingItems: false,

      snackbar: {
        show: false,
        color: '', // Puedes personalizar el color según el tipo de mensaje (éxito, error, etc.)
        message: '',
      },

      idUser: '',

      sellPrice: 0,
      paymentPlan: '',
      // Agrega más variables según sea necesario para otros campos
      interestType: '',
      capitalizationPeriod: '',
      initialShare: 0,
      finalShare: 0,
      interestRate: 0,
      frequencyPayment: 0,
      daysPerYear: 0,
      notarialCost: 0,
      registerCost: 0,
      tasacion: 0,
      studyCommission: 0,
      activationCommission: 0,
      ports: 0,
      administrativeWaste: 0,
      insuranceD: 0,
      insuranceRisk: 0,
      discountRate: 0,
      nyears: 0,
      gps: 0,

      // Opciones para el campo paymentPlan
      paymentPlanOptions: ['PLAN_36', 'PLAN_24'],
      interestTypOptions: ['TEA', 'TNA'],
      capitalizatOptions: ['DIARIA', 'MENSUAL'],
      // Agrega más opciones según sea necesario


      itemsList: [
    {
        id: 1,
        sellPrice: 0.0,
        paymentPlan: "PLAN_36",
        initialShare: 0.0,
        finalShare: 0.4,
        interestRate: 0.0,
        interestType: "TEA",
        capitalizationPeriod: "DIARIA",
        frequencyPayment: 0.0,
        daysPerYear: 0.0,
        notarialCost: 0.0,
        registerCost: 0.0,
        tasacion: 0.0,
        studyCommission: 0.0,
        activationCommission: 0.0,
        ports: 0.0,
        administrativeWaste: 0.0,
        insuranceD: 0.0,
        insuranceRisk: 0.0,
        discountRate: 0.0,
        user: {
            id: 1,
            email: "prueba@gmail.com",
            roles: [
                {
                    id: 1,
                    name: "ROLE_CLIENT"
                }
            ]
        },
        nyears: 3.0,
        gps: 0.0
    }
],
    };
  },
  created(){
    this.idUser = localStorage.getItem('idUser');

  },
  methods: {
    setDialog(item){
      this.itemSelect = item;
      this.loadingItemSelect.id = item.id;
      this.loadingItemSelect.load = true;
      setTimeout(() => {
        this.loadingItemSelect.id = '';
        this.loadingItemSelect.load = false;
        this.showdialog= true;
      }, 750);
      
    },
    submitLoanForm() {
      
      // Validación de campos
      if (!this.sellPrice || !this.paymentPlan) {
        this.showSnackbar('Todos los campos deben completarse', 'error');
        return;
      }

      // Objeto a enviar en el POST
      const loanData = {
        sellPrice: this.sellPrice,
        paymentPlan: this.paymentPlan,
        // Agrega más campos aquí según sea necesario
        interestType: this.interestType,
        capitalizationPeriod: this.capitalizationPeriod,
        initialShare: this.initialShare,

        finalShare: this.finalShare,

        interestRate: this.interestRate,
        frequencyPayment: this.frequencyPayment,
        daysPerYear: this.daysPerYear,
        notarialCost: this.notarialCost,
        registerCost: this.registerCost,
        tasacion: this.tasacion,
        studyCommission: this.studyCommission,
        activationCommission: this.activationCommission,
        ports: this.ports,
        administrativeWaste: this.administrativeWaste,
        insuranceD: this.insuranceD,
        insuranceRisk: this.insuranceRisk,
        discountRate: this.discountRate,

        nyears: this.nyears,

        gps: this.gps
      };

      // Realiza la solicitud POST con axios
      this.$axios.post(`/plans/${this.idUser}`, loanData)
        .then(response => {
          // Maneja la respuesta del servidor después de la solicitud POST
          console.log('Respuesta del servidor:', response.data);
          
          // Muestra un mensaje de éxito
          this.showSnackbar('Solicitud enviada con éxito', 'success');

          setTimeout(() => {
            this.getAllItems();
            this.showForm = false;
          }, 200);
        })
        .catch(error => {
          // Maneja el error después de la solicitud POST
          console.error('Error en la solicitud:', error);
          // Muestra un mensaje de error
          this.showSnackbar('Error al enviar la solicitud', 'error');
        });
      },
      getAllItems(){
        this.loadingItems = true;
        this.$axios.get(`/plans/users/${this.idUser}`)
        .then(response => {
            this.loadingItems = false;
            // Maneja la respuesta del servidor después de la solicitud POST
            console.log('Respuesta del servidor:', response.data);
            this.itemsList = response.data;
            // Muestra un mensaje de éxito
            this.showSnackbar('Lista de items actualizada con éxito', 'success');
          })
          .catch(error => {
            // Maneja el error después de la solicitud POST
            console.error('Error en la solicitud:', error);
            // Muestra un mensaje de error
            this.showSnackbar('Lista de items error', 'error');
          });
        
    },
    getResponseItem(numberId){
      this.$axios.get(`/plans_resuls/users/${numberId}`)
        .then(response => {
            // Maneja la respuesta del servidor después de la solicitud POST
            console.log('Respuesta del servidor:', response.data);
            this.itemResponse = response.data;
            // Muestra un mensaje de éxito
            this.showSnackbar('Resultado de item actualizada con éxito', 'success');
          })
          .catch(error => {
            // Maneja el error después de la solicitud POST
            console.error('Error en la solicitud:', error);
            // Muestra un mensaje de error
            this.showSnackbar('Resultado de item error', 'error');
          });
        
    },
    showSnackbar(message, color) {
        this.snackbar.show = true;
        this.snackbar.color = color;
        this.snackbar.message = message;
      },
  },
};
</script>
  