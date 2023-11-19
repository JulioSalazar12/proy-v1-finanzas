<template>
  <div>
    <h1 class="display-2 font-weight-bold mb-3">
      Welcome to Vuetify
    </h1>
    <v-btn @click="sampleGet">
      sample
    </v-btn>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
    }),
    methods:{
      sampleGet() {
        this.$axios.get('/character')
        .then(response => {
          // Manejar la respuesta
          console.log(response.data);
        })
        .catch(error => {
          // Manejar errores
          console.error(error);
        });
      }
    }
  }
</script>
