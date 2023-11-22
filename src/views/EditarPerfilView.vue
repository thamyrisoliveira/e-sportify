<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <EditarPerfilCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditarPerfilCard from '@/components/EditarPerfilCard.vue';

export default {
  name: 'EditarPerfilView',

  components: {
    EditarPerfilCard
  },
}
</script>
