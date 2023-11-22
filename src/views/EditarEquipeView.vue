<template>
    <v-container>
        <v-row class="text-center">
        <v-col class="mb-4">
            <EditarEquipe/>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import EditarEquipe from '@/components/EditarEquipe.vue';

export default {
    name: 'EditarEquipeView',

    components: {
        EditarEquipe
    },
}
</script>
  