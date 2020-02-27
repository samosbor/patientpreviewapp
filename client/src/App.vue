<template>
  <v-app>
    <Header />
    <v-content>
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },

  data: () => ({
    //
  })
}
</script>
