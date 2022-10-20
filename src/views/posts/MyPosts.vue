<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div class="bg-white relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                My Posts
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- Projects table -->
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Title
              </th>
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Description
              </th>
              <th colspan="2"
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Status
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(post, index) in posts" :key="index">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <span class="ml-3 font-bold text-blueGray-600">
                  {{ post.title }}
                </span>
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {{ post.description }}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <b>{{ status_to_text[post.status] }}</b>
              </td>
              <td>
                <button @click="()=>removePost(post)">
                  <i class="fa fa-trash"></i>
                </button>
                &nbsp;
                <button @click="$router.push({name: 'view_post', params: {id: post.id}})">
                  <i class="fa fa-eye"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
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
      posts: [],
      status_to_text: ["Pending", "Active", "Rejected"]
    }
  },
  methods: {
    getPosts() {
      axios.get('http://localhost:8000/api/post?user_id=' + this.$store.state.auth.user.id + '&status=*').then((result) => {
        this.posts = result.data.data
      }).catch((error) => {
        console.log('data error', error)
      })
    },
    removePost(post) {
      axios.post('http://localhost:8000/api/post/disable/' + post.id).then(() => {
        this.posts.splice(this.posts.indexOf(post), 1)
      }).catch((error) => {
        console.log('data error', error)
      })
    }
  },
  mounted() {
    this.getPosts()
  }
};
</script>
