<template>
  <div v-if="post"
       class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
  >
    <div class="px-6">
      <div class="text-center mt-12">
        <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
          {{ post.title }}
        </h3>
        <div class="mb-2 text-blueGray-600 mt-10">
          <i class="fas fa-user mr-2 text-lg text-blueGray-400"></i>
          {{ post.user.name }}
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-9/12 px-4">
            <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
              {{ post.description }}
            </p>
          </div>
        </div>
      </div>

      <hr class="mt-6 border-b-1 border-blueGray-300"/>
      <br>
      <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
        Comentarios
      </h3>
      <div class="mb-2 text-blueGray-600 comment-x" v-for="(comment, index) in post.comments" :key="index">
        <i class="fas fa-user mr-2 text-lg text-blueGray-400"></i> {{ comment.user.name }}
        <br>
        Comment: {{ comment.comment }}
      </div>

      <hr class="mt-6 border-b-1 border-blueGray-300"/>
      <br>
      <form>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                Nuevo Comentario
              </label>
              <input type="text" v-model="comment"
                     class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
            </div>
          </div>
        </div>

        <button type="button" @click="saveComment"
                class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
          Save Comment
        </button>
        <br><br>
      </form>
    </div>
  </div>
</template>
<script>

import axios from "axios";

export default {
  data() {
    return {
      post_id: null,
      post: null,
      comment: '',
    }
  },
  methods: {
    getPostInfo() {
      axios.get('http://localhost:8000/api/post/' + this.post_id).then((result) => {
        this.post = result.data.data
      }).catch((error) => {
        console.log('data error', error)
      })
    },
    saveComment() {
      if (!this.comment) {
        alert('Comment can\'t be null')
        return
      }

      const data = {
        user_id: this.$store.state.auth.user.id,
        comment: this.comment,
        post_id: this.post.id
      }

      axios.post('http://localhost:8000/api/post/comment', data).then(() => {
        this.comment = "";
        this.getPostInfo()
      }).catch((error) => {
        console.log('data error', error)
      })
    }
  },
  mounted() {
    this.post_id = this.$route.params.id;
    this.getPostInfo()
  }
};
</script>
