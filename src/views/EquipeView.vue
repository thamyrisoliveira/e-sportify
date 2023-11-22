<template>
    <v-container>
        <v-row class="text-center">
        <v-col class="mb-4">
            <Equipe/>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Equipe from '@/components/Equipe.vue';

export default {
    name: 'EditarPerfilView',

    components: {
        Equipe
    },
}
</script>
  