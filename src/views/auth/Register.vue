<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <br><br>
            <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small v-for="(error, index) in errors" :key="index">{{ error[0] }}</small>
            </div>
            <form action="javascript:void(0)" @submit="register">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Name
                </label>
                <input type="text" placeholder="Name" v-model="user.name"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
              </div>

              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Email
                </label>
                <input type="email" placeholder="Email" v-model="user.email"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>

              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Password
                </label>
                <input type="password" placeholder="Password" v-model="user.password"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
              </div>

              <div class="text-center mt-6">
                <button type="submit" :disabled="processing"
                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                  {{ processing ? "Please wait" : "Create Account" }}
                </button>
              </div>
            </form>
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
      user: {
        name: "",
        email: "",
        password: "",
      },
      processing: false
    };
  },
  methods: {
    ...mapActions({
      signIn: 'auth/login'
    }),
    async register() {
      this.processing = true

      await axios.post('http://localhost:8000/api/auth/register', this.user).then(() => {
        this.signIn()
      }).catch(({response: {data}}) => {
        this.errors = data.errors

        if (!data.errors && data.message) {
          this.errors = [[data.message]]
        }

      }).finally(() => {
        this.processing = false
      })
    }
  }
};
</script>
