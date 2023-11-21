import UsuarioService from "@/service/usuario";
import { getAuth } from "firebase/auth";

const initialState = {
    loading: false,
    usuario: null,
    editar: false,
}

const state = () => ({
    ...initialState
})

const mutations = {
    reset: function(state) {
        state = {...initialState}
    },
    setLoading: function (state, loading) {
        state.loading = loading
    },
    setUsuario: function (state, usuario) {
        state.usuario = usuario
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
        UsuarioService.getUsuarioProfile(auth.user.uid)
                    .then(usuario => {
                        commit("setUsuario", usuario)
                    })
    },
    salvar: function({commit}, payload) {
        commit("setLoading", true)
        UsuarioService.salvar(payload).then((usuario) => {
            commit("setUsuario", usuario)
        })
        .catch((error) => {
            console.log("An erro occurred while tried to authenticate.", error)
        })
        .finally(()=>{
            commit("setLoading", false)
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}