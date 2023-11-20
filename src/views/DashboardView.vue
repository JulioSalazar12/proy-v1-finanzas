<template>
  <div class="pa-5 d-flex flex-column align-center">
    <h1>Dashboard View</h1>
    <p>Bienvenido al panel de control</p>

    <v-card width="1000" class="pa-5 mt-5" outlined>
      <v-form v-if="showForm" @submit.prevent="submitLoanForm" class="d-flex flex-column">
        <!-- Primera columna -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field outlined dense hide-details class="mb-3" v-model="sellPrice" label="Precio de Venta del Activo" required type="number"></v-text-field>
            <v-select outlined dense hide-details class="mb-3" v-model="paymentPlan" :items="paymentPlanOptions" label="Tipo de plan de pagos" required></v-select>
            <!-- Agrega más campos aquí según sea necesario -->
            <v-text-field outlined dense hide-details class="mb-3" v-model="initialShare" label="% Cuota Inicial" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="finalShare" label="% Cuota final" disabled required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="nyears" label="Nº de Años" disabled required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="interestRate" label="Tasa de interés" required type="number"></v-text-field>
      
            <v-select outlined dense hide-details class="mb-3" v-model="interestType" :items="interestTypOptions" label="Tipo de tasa de interés" required></v-select>
            <v-select outlined dense hide-details class="mb-3" v-model="capitalizationPeriod" :items="capitalizatOptions" label="Periodo de capitalización" required></v-select>
            <v-text-field outlined dense hide-details class="mb-3" v-model="frequencyPayment" label="Frecuencia de pago" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="daysPerYear" label="Nº de días por año" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="notarialCost" label="Costes Notariales" required type="number"></v-text-field>
          </v-col>
    
          <!-- Segunda columna -->
          <v-col cols="12" md="6">
            <v-text-field outlined dense hide-details class="mb-3" v-model="registerCost" label="Costes Registrales" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="tasacion" label="Tasación" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="studyCommission" label="Comisión de estudio" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="activationCommission" label="Comisión activación" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="gps" label="GPS" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="ports" label="Portes" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="administrativeWaste" label="Gastos de Administración" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="insuranceD" label="% de Seguro desgravamen" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="insuranceRisk" label="% de Seguro riesgo" required type="number"></v-text-field>
            <v-text-field outlined dense hide-details class="mb-3" v-model="discountRate" label="Tasa de descuento" required type="number"></v-text-field>

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
          <h3 class="pt-4">Plan ID: 000-{{ item.id }}</h3>
          <p class="mb-0">sellPrice: {{item.sellPrice}}</p>
          <p class="mb-0">paymentPlan: {{item.paymentPlan}}</p>
          <p class="mb-0">interestType: {{item.interestType}}</p>
          <p class="mb-0">capitalizationPeriod: {{item.capitalizationPeriod}}</p>
        </v-card>
    
      </div>
      
    </v-card>

    <v-dialog v-model="showdialog" width="700">
      <v-card class="pa-4 d-flex flex-column align-start">
        <h3 class="mb-3">{{showFirst?'Datos de ':'Resultados de'}} Plan ID: 000-{{ itemSelect.id }}</h3>
        <v-row v-if="showFirst" style="width: 100%;">
            <v-col cols="12" md="6">
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.sellPrice" label="Precio de Venta del Activo" required disabled type="number"></v-text-field>
              
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.paymentPlan" label="Tipo de plan de pagos" required disabled></v-text-field>

              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.initialShare" label="% Cuota Inicial" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.finalShare" label="% Cuota final" disabled required type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.nyears" label="Nº de Años" disabled required type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.interestRate" label="Tasa de interés" required disabled type="number"></v-text-field>
        
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.interestType" label="Tipo de tasa de interés" required disabled></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.capitalizationPeriod" label="Periodo de capitalización" required disabled></v-text-field>

              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.frequencyPayment" label="Frecuencia de pago" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.daysPerYear" label="Nº de días por año" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.notarialCost" label="Costes Notariales" required disabled type="number"></v-text-field>
            </v-col>
      
            <!-- Segunda columna -->
            <v-col cols="12" md="6">
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.registerCost" label="Costes Registrales" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.tasacion" label="Tasación" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.studyCommission" label="Comisión de estudio" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.activationCommission" label="Comisión activación" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.gps" label="GPS" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.ports" label="Portes" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.administrativeWaste" label="Gastos de Administración" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.insuranceD" label="% de Seguro desgravamen" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.insuranceRisk" label="% de Seguro riesgo" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemSelect.discountRate" label="Tasa de descuento" required disabled type="number"></v-text-field>
            </v-col>

        </v-row>
        <v-row v-else style="width: 100%;">
            <v-col cols="12" md="6">
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tea" label="TEA" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tem" label="TEM" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.numSharePerYear" label="Nº Cuotas por Año" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.totalSharePerYear" label="Nº Total de Cuotas" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.initialShare" label="Cuota Inicial" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.finalShare" label="Cuota Final" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.loanAmount" label="Monto del préstamo" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.finaciarCuotas" label="Saldo a financiar con cuotas" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.seguroDesgrav" label="% de Seguro desgrav. per." required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.seguroRiesgo" label="Seguro Riesgo" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.interests" label="Intereses" required disabled type="number"></v-text-field>
            </v-col>
            
            <!-- Segunda columna -->
            <v-col cols="12" md="6">
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.amortizacion" label="Amortización del capital" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.desgravamen" label="Seguro de desgravamen" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.seguroTodoRiesgo" label="Seguro contra todo riesgo" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.gps" label="GPS" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.ports" label="Portes" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.admGastos" label="Gastos Adm." required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.discountRate" label="Tasa de descuento" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tir" label="TIR" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.tcea" label="TCEA" required disabled type="number"></v-text-field>
              <v-text-field outlined dense hide-details class="mb-3" v-model="itemResponse.van" label="VAN" required disabled type="number"></v-text-field>

            </v-col>

        </v-row>
        <v-row  class="pt-0 mt-0">
          <v-col cols="12" md="12">
            <v-btn class="elevation-0" color="primary" @click="showFirst = !showFirst">{{showFirst?'Ver':'Ocultar'}} Resultados</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
        {{ snackbar.message }}
    </v-snackbar>

    <router-link @click.native="logout" to="#" class="logout-link">
      Logout
    </router-link>


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

      sellPrice: 40000,
      paymentPlan: 'PLAN_24',
      // Agrega más variables según sea necesario para otros campos
      interestType: 'TNA',
      capitalizationPeriod: 'DIARIA',
      initialShare: 0.2,
      finalShare: 0,
      interestRate: 0.13,
      frequencyPayment: 30,
      daysPerYear: 360,
      notarialCost: 80,
      registerCost: 70,
      tasacion: 20,
      studyCommission: 20,
      activationCommission: 10,
      ports: 5,
      administrativeWaste: 6,
      insuranceD: 0.0005,
      insuranceRisk: 0.0045,
      discountRate: 0.6,
      nyears: 0,
      gps: 20,

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
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    async setDialog(item){
      this.itemSelect = item;
      this.loadingItemSelect.id = item.id;
      this.loadingItemSelect.load = true;
      await this.getResponseItem(item.id);
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
      this.$axios.get(`/plan_results/users/${numberId}`)
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
  