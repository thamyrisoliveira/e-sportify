<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, index) in items"
      :key="index"
    >
      <v-sheet
        class="text-center"
        :color="item.color"
      >
        <v-img
          :src="item.image"
          max-width="200"
          max-height="150"
          contain
        ></v-img>
        <div class="caption">
          {{ item.caption }}
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'HomeAuth', 
  methods: {
    login() {
      // Redirecionar para a página de login
      this.$router.push('/login');
    },
    register() {
      // Redirecionar para a página de registro
      this.$router.push('/registrar');
    },
      },
  data() {
    return {
      items: [
        {
          image: 'URL_DA_IMAGEM_1',
          caption: 'Imagem 1',
          color: 'primary',
        },
        {
          image: 'URL_DA_IMAGEM_2',
          caption: 'Imagem 2',
          color: 'secondary',
        },
        {
          image: 'URL_DA_IMAGEM_3',
          caption: 'Imagem 3',
          color: 'info',
        },
      ],
    };
  },
};





</script>

<style>
.caption {
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
</style>

