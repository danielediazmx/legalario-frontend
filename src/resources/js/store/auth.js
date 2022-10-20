import axios from 'axios'

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: {},
        user_token: ''
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        user_token(state) {
            return state.user_token
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },
        SET_USER(state, value) {
            state.user = value
        },
        SET_USER_TOKEN(state, value) {
            state.user_token = value
        }
    },
    actions: {
        async login({commit}, result) {
            let token = result.data.token;
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };

            return axios.get('http://localhost:8000/api/user', config).then(({data}) => {
                commit('SET_USER', data)
                commit('SET_USER_TOKEN', token)
                commit('SET_AUTHENTICATED', true)


                // set axios data
                axios.interceptors.request.use(
                    (config) => {
                        if (token) {
                            config.headers['Authorization'] = `Bearer ${token}`
                        }

                        return config
                    },

                    (error) => {
                        return Promise.reject(error)
                    }
                )

            }).catch(() => {
                commit('SET_USER', {})
                commit('SET_USER_TOKEN', '')
                commit('SET_AUTHENTICATED', false)
            })
        },
        logout({commit}) {
            commit('SET_USER_TOKEN', '')
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
        }
    }
}