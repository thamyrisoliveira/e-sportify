import UsuarioService from "@/service/usuario";
import EquipeService from "@/service/equipe";
import { getAuth } from "firebase/auth";

const initialEquipeState = {
    nome: '',
    manager: null,
    membros: [],
}

const initialState = {
    loading: false,
    usuario: null,
    equipe: {
        ...initialEquipeState
    },
    editar: false,
    usuarios: [],
    jogadores: [],
    gerentes: [],
    equipes: [],
}

const state = () => ({
    ...initialState
})

const mutations = {
    reset: function(state) {
        state = {...initialState}
    },
    resetEquipe: function(state) {
        state.equipe = initialEquipeState
    },
    setLoading: function (state, loading) {
        state.loading = loading
    },
    setUsuario: function (state, usuario) {
        state.usuario = usuario
    },
    setUsuarios: function (state, usuarios) {
        state.usuarios = usuarios
    },
    setGerenteList: function (state, gerentes) {
        state.gerentes = gerentes
    },
    setJogadorList: function (state, jogadores) {
        state.jogadores = jogadores
    },
    setEquipe: function (state, equipe) {
        state.equipe = equipe
    },
    setEquipes: function (state, equipes) {
        state.equipes = equipes
    },
    setEditar: function(state, editar) {
        state.editar = editar
    },
    adicionarExperiencia: function(state, experiencia) {
        console.log(state.usuario.experiencias)
        if (!state.usuario.experiencias) {
            state.usuario.experiencias = []
        }
        experiencia.id = (+new Date * Math.random()).toString(36).substring(0,6) 
        state.usuario = {
            ...state.usuario,
            experiencias: [...state.usuario.experiencias, experiencia]
        }
    },
    removerExperiencia: function(state, index) {
        if (index > -1) {
            state.usuario.experiencias.splice(index)
        }
    }
}

const actions = {
    autenticar: function ({ commit }, payload) {
        commit("setLoading", true)
        UsuarioService.autenticar(payload.usuario)
            .then((auth) => {
                UsuarioService.getUsuarioProfile(auth.user.uid)
                    .then(usuario => {
                        usuario.uid = auth.user.uid
                        commit("setUsuario", usuario)
                        payload.router.replace("/homeauth");
                    })
                
            })
            .catch((error) => {
                console.log("An erro occurred while tried to authenticate.", error)
            })
            .finally(()=>{
                commit("setLoading", false)
            })
    },
    carregaPerfil: function({commit}) {
        let auth = getAuth()
        UsuarioService.getUsuarioProfile(auth.currentUser.uid)
                    .then(usuario => {
                        commit("setUsuario", usuario)
                    })
    },
    salvar: function({commit}, payload) {
        commit("setLoading", true)
        UsuarioService.salvar(payload).then((usuario) => {
            commit("setUsuario", usuario)
            commit("setEditar", false)
        })
        .catch((error) => {
            console.log("An erro occurred while tried to authenticate.", error)
        })
        .finally(()=>{
            commit("setLoading", false)
        })
    },
    buscarUsuarios: function({commit}, nome) {
        commit("setLoading", true)
        UsuarioService.buscarPorNome(nome).then((usuarios) => {
            commit("setUsuarios", usuarios)
        })
        .catch((error) => {
            console.log("An erro occurred while tried to authenticate.", error)
        })
        .finally(()=>{
            commit("setLoading", false)
        })
    },
    listaUsuarios: function({commit}, perfil) {
        commit("setLoading", true)
        UsuarioService.listar(perfil).then((usuarios) => {
            commit("set"+perfil+'List', usuarios)
        })
        .catch((error) => {
            console.log("An erro occurred while tried to authenticate.", error)
        })
        .finally(()=>{
            commit("setLoading", false)
        })
    },
    salvarEquipe: function({commit, dispatch}, payload) {
        commit("setLoading", true)
        EquipeService.salvar(payload).then((equipe) => {
            commit("setEquipe", equipe)
            dispatch('listaEquipes')
            commit('resetEquipe')
        })
        .catch((error) => {
            console.log("An erro occurred while tried to authenticate.", error)
        })
        .finally(()=>{
            commit("setLoading", false)
        })
    },
    listaEquipes: function({commit}) {
        commit("setLoading", true)
        EquipeService.listar().then((equipes) => {
            commit("setEquipes", equipes)
        })
        .catch((error) => {
            console.log("An erro occurred while tried to authenticate.", error)
        })
        .finally(()=>{
            commit("setLoading", false)
        })
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}