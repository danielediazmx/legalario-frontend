<template>
  <nav
      class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
    <div
        class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <!-- Toggler -->
      <button type="button" v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
              class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent">
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link to="/"
                   class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
        Legalario
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown/>
        </li>
        <li class="inline-block relative">
          <user-dropdown/>
        </li>
      </ul>
      <!-- Collapse -->
      <div v-bind:class="collapseShow"
           class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded">
        <!-- Collapse header -->
        <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link to="/"
                           class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                Legalario
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button type="button" v-on:click="toggleCollapseShow('hidden')"
                      class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input type="text" placeholder="Search"
                   class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"/>
          </div>
        </form>

        <hr class="my-4 md:min-w-full"/>
        <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          Menú
        </h6>
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <a href="javascript:;" @click="$router.push({'name':'posts'})"
               class="text-xs uppercase py-3 font-bold block text-emerald-500 hover:text-emerald-600">
              <i class="fas fa-book mr-2 text-sm text-blueGray-300"></i>
              Posts
            </a>
          </li>
          <li class="items-center">
            <a href="javascript:;" @click="$router.push({'name': 'my_posts'})"
               class="text-xs uppercase py-3 font-bold block text-emerald-500 hover:text-emerald-600">
              <i class="fas fa-book mr-2 text-sm text-blueGray-300"></i>
              My Posts
            </a>
          </li>
          <li class="items-center">
            <a href="javascript:;" @click="$router.push({'name': 'create_post'})"
               class="text-xs uppercase py-3 font-bold block text-emerald-500 hover:text-emerald-600">
              <i class="fas fa-book mr-2 text-sm text-blueGray-300"></i>
              Create Post
            </a>
          </li>
        </ul>

        <div v-if="$store.state.auth.user && $store.state.auth.user.role == 1">
          <hr class="my-4 md:min-w-full"/>
          <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin
          </h6>
          <ul class="md:flex-col md:min-w-full flex flex-col list-none">
            <li class="items-center">
              <a href="javascript:;" @click="$router.push({'name':'admin_posts'})"
                 class="text-xs uppercase py-3 font-bold block text-emerald-500 hover:text-emerald-600">
                <i class="fas fa-book mr-2 text-sm text-blueGray-300"></i>
                Posts
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
); }

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
  },
  components: {
    NotificationDropdown,
    UserDropdown,
  },
};
</script>
