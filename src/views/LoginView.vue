<template>
  <div class="sample-login d-flex align-center justify-center">
    <v-card outlined width="500" class="pa-5 rounded-lg">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" class="elevation-0" color="primary">Login</v-btn>
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
    login() {
      // Realiza la llamada a la API para autenticar y obtener el token
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      this.$axios.post('/login', { username: this.username, password: this.password })
        .then(response => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          // Redirige a la página de dashboard o a la ruta deseada después del inicio de sesión
          this.$router.push('/dashboard');

          this.showSnackbar('Login exitoso', 'success');
        })
        .catch(error => {
          console.error('Error de inicio de sesión:', error);

          this.showSnackbar('Error de inicio de sesión', 'error');
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
.sample-login{
  min-width: 100vh;
  min-height: 100vh;
}
</style>  