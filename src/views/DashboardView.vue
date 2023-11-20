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
  
  <div class="d-flex justify-space-between mt-8" style="width: 80%;">
    <span class="mt-3 font-weight-black">ITEMS:</span>
    <v-btn class="elevation-0" color="indigo" dark @click="getAllItems" :loading="loadingItems">Refresh</v-btn>
  </div>

  <div v-if="itemsList!=[]" class="d-flex mt-3 flex-wrap justify-center" style="gap: 10px;">
    <v-card v-for="(item, index) in itemsList" :key="index" outlined class="pa-4 d-flex flex-column align-start" width="350">
      <h3>SAMPLE ID: 000-{{ item.id }}</h3>
      <p class="mb-0">sellPrice: {{item.sellPrice}}</p>
      <p class="mb-0">paymentPlan: {{item.paymentPlan}}</p>
      <p class="mb-0">interestType: {{item.interestType}}</p>
      <p class="mb-0">capitalizationPeriod: {{item.capitalizationPeriod}}</p>
    </v-card>

  </div>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
  </v-snackbar>


  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: true,

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


      itemsList: [],
    };
  },
  created(){
    this.idUser = localStorage.getItem('idUser');

  },
  methods: {
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
    showSnackbar(message, color) {
        this.snackbar.show = true;
        this.snackbar.color = color;
        this.snackbar.message = message;
      },
  },
};
</script>
  