<template>
    <v-card
        class="mx-auto card-color"
        max-width="344"
        >
        <v-card-title class="text-md-h6">
            <span class="white--text text-center">
                <v-icon color="white">mdi-account</v-icon>
                {{ usuario.nickname }}
                
            </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{ usuario.resumo }}</v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    usuario: Object
  }
}
</script>
<style scoped>
.card-color {
    background-color: #D32F2F;
}
</style>