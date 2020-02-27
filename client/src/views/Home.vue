<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank"
            >Discord Community</a
          >
        </p>
      </v-col>
      <v-col>
        <div>
          <v-btn v-if="!$auth.isAuthenticated" @click="login"
            >Sign Up to Browse Events</v-btn
          >
          <h3 v-if="$auth.isAuthenticated">Welcome, {{ $auth.user.name }}!</h3>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'home',
  components: {},
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect()
    }
  }
}
</script>
