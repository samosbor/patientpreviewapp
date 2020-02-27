<template>
  <v-card v-if="user && userData" width="50%" class="pa-5">
    <h1 class="text-center">Basic Info</h1>
    <div class="subheading">Name</div>
    <v-text-field v-model="name" outlined placeholder="name">
      <template v-slot:append-outer>
        <v-btn @click="updateName()">Update</v-btn>
      </template>
    </v-text-field>
    <div class="subheading">Email</div>
    <div class="font-weight-light">
      {{ user.email }}
      <p v-if="!user.email_verified" class="red--text">Not Verified</p>
    </div>
    <div class="subheading pt-2">Company</div>
    <p class="font-weight-light">{{ userData.companyName }}</p>
    <div class="subheading pt-2">Subscription Level</div>
    <p class="font-weight-light">{{ userData.planLevel }}</p>
    <div class="subheading pt-2">Role</div>
    <p class="font-weight-light">{{ userData.role }}</p>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbartext }}
      <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>
<script>
import UserService from '@/services/UserService'

export default {
  name: 'ProfileBasicInfo',
  props: {
    user: Object,
    userData: Object
  },
  data: () => ({
    name: '',
    snackbar: false,
    snackbartext: ''
  }),
  mounted() {
    this.name = this.user.name
  },
  methods: {
    async updateName() {
      const accessToken = await this.$auth.getTokenSilently()
      UserService.updateUserName(accessToken, this.name).then(response => {
        this.snackbartext = response
        this.snackbar = true
      })
    }
  }
}
</script>
