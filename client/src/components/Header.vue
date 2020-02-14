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
      <v-menu offset-y v-if="$auth.isAuthenticated">
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          icon
          v-on="on"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-if="store.user"
          key="Profile"
          @click="$router.push('/profile')"
        >
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="admin"
          key="Admin"
          @click="$router.push('/admin')"
        >
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    </v-app-bar>
</template>
<script>
import { store } from '@/store/store'
export default {
  components: {
  },
  data: () => ({
    store: store
  }),
  computed: {
    admin() {
      return this.store.user && this.store.userData && this.store.userData.Role == "Administrator"
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
};
</script>