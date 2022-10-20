<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <br><br>
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small v-for="(error, index) in errors" :key="index">{{ error[0] }}</small>
            </div>
            <form action="javascript:void(0)" class="row" method="post">
              <div class="relative w-full mb-3">
                <label htmlFor="grid-password" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Email
                </label>
                <input type="email" placeholder="Email" v-model="auth.email"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
              </div>

              <div class="relative w-full mb-3">
                <label htmlFor="grid-password" class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Password
                </label>
                <input type="password" placeholder="Password" v-model="auth.password"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
              </div>

              <div class="text-center mt-6">
                <button type="button" :disabled="processing" @click="login"
                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                  {{ processing ? "Please wait" : "Sign in" }}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2 text-right">
            <router-link to="/auth/register" class="text-blueGray-200">
              <small>Create new account</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import axios from "axios";

export default {
  data() {
    return {
      errors: [],
      auth: {
        email: "",
        password: ""
      },
      processing: false
    };
  },
  methods: {
    ...mapActions({
      signIn: 'auth/login'
    }),
    async login() {
      this.processing = true
      const router = this.$router

      await axios.get('http://localhost:8000/sanctum/csrf-cookie')
      await axios.post('http://localhost:8000/api/auth/login', this.auth).then((result) => {
        this.signIn(result, router).then(() => {
          this.$router.push({'name': 'posts'})
        })
      }).catch(({response: {data}}) => {
        this.errors = data.errors

        if (!data.errors && data.message) {
          this.errors = [[data.message]]
        }

      }).finally(() => {
        this.processing = false
      })
    },
  }
};
</script>
