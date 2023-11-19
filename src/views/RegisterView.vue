<!-- Register.vue -->
<template>
    <div class="sample-login d-flex flex-column align-center justify-center">
        <v-card outlined width="500" class="pa-5 rounded-lg mb-5">
          <v-card-title class="text-center">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field v-model="username" label="Username" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-btn type="submit" color="primary">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
            {{ snackbar.message }}
        </v-snackbar>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        snackbar: {
        show: false,
        color: '', // Puedes personalizar el color según el tipo de mensaje (éxito, error, etc.)
        message: '',
      },
      };
    },
    methods: {
      register() {
        // Realiza la lógica de registro aquí
        console.log('Username:', this.username);
        console.log('Password:', this.password);
  
        // Haz la llamada a la API para el registro
        this.$axios.post('/users/auth/sign-up', {
          username: this.username,
          password: this.password,
        })
        .then(response => {
          // Maneja la respuesta del servidor después del registro
          console.log('Registro exitoso:', response.data);

          this.showSnackbar('Registro exitoso', 'success');

          setTimeout(() => {
            this.$router.push('/login');
          }, 1000);
          
        })
        .catch(error => {
            console.error('Error de registro:', error); 
            this.showSnackbar('Registro error', 'error');
            setTimeout(() => {
              this.$router.push('/login');
            }, 1000);
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
  
  <style>
  /* Puedes agregar estilos específicos aquí si es necesario */
  </style>
  