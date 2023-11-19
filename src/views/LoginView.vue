<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Realiza la llamada a la API para autenticar y obtener el token
        this.$axios.post('/login', { username: this.username, password: this.password })
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            // Redirige a la página de dashboard o a la ruta deseada después del inicio de sesión
            this.$router.push('/dashboard');
          })
          .catch(error => {
            console.error('Error de inicio de sesión:', error);
          });
      },
    },
  };
  </script>
  