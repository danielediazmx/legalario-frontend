<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-12/12 px-4">
      <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div class="rounded-t bg-white mb-0 px-6 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">Create Post</h6>
            <button type="button" @click="savePost"
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
              Save Changes
            </button>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"></h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Title
                  </label>
                  <input type="text" v-model="post.title"
                         class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Description
                  </label>
                  <textarea cols="30" rows="10" v-model="post.description"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
      post: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    savePost() {
      this.post.user_id = this.$store.state.auth.user.id
      if (!this.post.title || !this.post.description) {
        alert('Title and description can\'t be null')
        return
      }

      axios.post('http://localhost:8000/api/post', this.post).then(() => {
        this.$router.push({name: 'my_posts'})
      }).catch((error) => {
        console.log('data error', error)
      })
    }
  }
};
</script>
