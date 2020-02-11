<template>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase" @click="$router.push('/search')" style="cursor: pointer">
        <span>Patient</span>
        <span class="font-weight-light">PREVIEW</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        Logout
      </v-toolbar-items>
    </v-app-bar>
</template>
<script>
export default {
  components: {
  },
  data: () => ({
    
  }),
};
</script>