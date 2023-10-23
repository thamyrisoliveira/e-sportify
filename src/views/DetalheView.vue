<template>
    <div>
        <div>Jogador: {{ this.nome }}</div>
        <div>Vezes que foi MVP: {{ this.qtdMvp }}</div>
    </div>
</template>

<script>
export default {
    name: 'DetalheView',
    data() {
        return {nome:"", qtdMvp: null}
    },
    beforeMount() {
        this.nome = this.$route.query.nome
        this.qtdMvp = this.$route.query.qtdMvp
    }
}
</script>