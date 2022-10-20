<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div class="bg-white relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Filters
              </h3>
              <form>
                <div class="flex flex-wrap">
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Status
                      </label>
                      <select v-model="filter.status"
                              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option value="*">All</option>
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                        <option value="2">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Created at
                      </label>
                      <input type="date" v-model="filter.start_date" placeholder="Start date"
                             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    </div>
                  </div>
                  <div class="w-full lg:w-4/12 px-4">
                    <div class="relative w-full mb-3">
                      <label>-</label>
                      <input type="date" v-model="filter.end_date" placeholder="End date"
                             class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    </div>
                  </div>
                </div>
                <button type="button" @click="getPosts"
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-12 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Apply filter
                </button>
                &nbsp;
                <button type="button" @click="clearFilter"
                        class="bg-black text-white active:bg-emerald-600 font-bold uppercase text-xs px-12 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Clear Filter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mb-12 px-4">
      <div class="bg-white relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-blueGray-700">
                Global Posts
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
              <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                Created By
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
                {{ post.user.name }}
              </td>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <b>{{ status_to_text[post.status] }}</b>
              </td>
              <td>
                <button @click="()=>changeStatus(post,1)">
                  <i class="fa fa-thumbs-up"></i>
                </button>
                &nbsp;
                <button @click="()=>changeStatus(post, 2)">
                  <i class="fa fa-thumbs-down"></i>
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
  components: {},
  data() {
    return {
      posts: [],
      status_to_text: ["Pending", "Active", "Rejected"],
      filter: {
        status: '*',
        start_date: null,
        end_date: null
      },
    }
  },
  methods: {
    getPosts() {
      let url = 'http://localhost:8000/api/post?status=' + this.filter.status;
      if (this.filter.start_date && this.filter.end_date) {
        url += "&start_date=" + this.filter.start_date + "&end_date=" + this.filter.end_date;
      }
      axios.get(url).then((result) => {
        this.posts = result.data.data
      }).catch((error) => {
        console.log('data error', error)
      })
    },
    changeStatus(post, status) {
      axios.get('http://localhost:8000/api/admin/post/status/' + post.id + '/' + status).then(() => {
        this.getPosts()
      }).catch((error) => {
        console.log('data error', error)
      })
    },
    clearFilter() {
      this.filter = {
        status: '*',
        start_date: null,
        end_date: null
      }

      this.getPosts()
    }
  },
  mounted() {
    this.getPosts()
  }
};
</script>
