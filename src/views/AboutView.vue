<script setup>
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import Nav from '../components/Nav.vue';
import { computed } from 'vue';

const route = useRoute();
const id = route.params.id;

const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      const data = await response.data.data;
      return data;
    },
  });
};

const { data } = useUserQuery();
</script>

<template>
  <Nav />

  <section
    class="bg-[#071e34] flex font-medium items-center justify-center h-screen"
  >
    <section
      class="w-64 mx-auto bg-[#20354b] rounded-2xl px-14 py-12 shadow-lg"
    >
      <div class="mt-6 w-fit mx-auto">
        <img
          :src="data.avatar"
          class="rounded-full w-28"
          alt="profile picture"
          srcset=""
        />
      </div>

      <div class="mt-8">
        <h2 class="text-white font-bold text-2xl tracking-wide text-center">
          {{ data.first_name }} {{ data.last_name }}
        </h2>
      </div>

      <hr class="bg-indigo-700 h-1 my-5" />
    </section>
  </section>
</template>
