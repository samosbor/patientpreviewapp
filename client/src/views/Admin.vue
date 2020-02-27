<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="store.userData" width="50%" class="pa-5">
          <h1 class="text-center">Admin Settings</h1>
          <div class="subheading pt-2">Company</div>
          <p class="font-weight-light">{{ store.userData.companyName }}</p>
          <div class="subheading pt-2">Subscription Level</div>
          <p class="font-weight-light">{{ store.userData.planLevel }}</p>
          <div class="subheading pt-2">Role</div>
          <p class="font-weight-light">{{ store.userData.role }}</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card width="50%" class="pa-5">
          Company users
          <v-list v-model="companyUsers" rounded>
            <v-list-item v-for="(user, i) in companyUsers" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="user.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="user.email"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbartext }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { store } from '@/store/store'
import UserService from '@/services/UserService'

export default {
  name: 'Admin',
  components: {},
  data: () => ({
    store,
    snackbar: false,
    snackbartext: '',
    companyUsers: []
  }),
  mounted() {
    this.setUp()
  },
  methods: {
    async setUp() {
      const accessToken = await this.$auth.getTokenSilently()
      UserService.getCompanyUsers(
        accessToken,
        this.store.userData.companyName
      ).then(response => {
        this.companyUsers = response
      })
    }
  }
}
</script>
