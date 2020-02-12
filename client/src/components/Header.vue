<template>
    <v-app-bar app color="primary">
      <v-toolbar-title class="headline text-uppercase"
        @click="$router.push('/search')"
        style="cursor: pointer">
        <span class="white--text">Patient</span>
        <span class="font-weight-light white--text">PREVIEW</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn v-if="$auth.isAuthenticated" dark outlined @click="logout()">Logout</v-btn>

    </v-app-bar>
</template>
<script>
export default {
  components: {
  },
  data: () => ({
    
  }),
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
};
</script>