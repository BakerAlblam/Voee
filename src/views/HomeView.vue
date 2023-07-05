<script setup>
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import Nav from "../components/Nav.vue";
import { ref, computed } from "vue";

const pageNumber = ref(1);

const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users", pageNumber],
    queryFn: async () => {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${pageNumber.value}`
      );
      const data = await response.data.data;
      return data;
    },
  });
};

const { isLoading, isError, data, error } = useUsersQuery();

const isPreviousData = computed(() => {
  return pageNumber.value <= 1 || isLoading.value;
});

const prevPage = () => {
  pageNumber.value = Math.max(pageNumber.value - 1, 1);
};

const nextPage = () => {
  pageNumber.value++;
};

const isPage2 = computed(() => {
  return pageNumber.value === 2;
});
</script>

<template>
  <div class="bg-[#071e34] min-h-screen flex flex-col">
    <Nav />
    <div v-if="isLoading">Loading</div>
    <div v-else-if="isError">Error: {{ error }}</div>
    <div v-else>
      <div class="flex flex-wrap gap-10 mx-5 mt-10 justify-center">
        <div
          v-for="user in data"
          :key="user.id"
          class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
        >
          <div
            class="bg-[#20354b] rounded-lg p-4 mt-4 flex flex-col items-center mb-7"
          >
            <div class="user-avatar mb-2">
              <img v-if="user.avatar" :src="user.avatar" class="rounded-lg" />
            </div>
            <div class="user-info text-center">
              <span class="text-white font-bold text-2xl tracking-wide"
                >{{ user.first_name }} {{ user.last_name }}</span
              >
              <hr class="bg-indigo-700 h-1 my-2" />
              <RouterLink
                class="text-white font-bold text-1xl tracking-wide"
                :to="{ name: 'about', params: { id: user.id } }"
                >Email</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center my-5">
        <button
          :disabled="isPreviousData"
          @click="prevPage"
          class="px-4 py-2 mx-2 bg-indigo-700 text-white rounded"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="isPage2"
          class="px-4 py-2 mx-2 bg-indigo-700 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>


<style>
html, body {
  height: 100%;
}
</style>