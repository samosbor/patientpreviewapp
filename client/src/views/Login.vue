<template>
  <v-container fluid>
    <DiagonalStripes />
    <v-row>
      <v-col cols="5" class="mx-12">
        <v-card class="pa-5 ma-5">
          <h1 class="pb-5">
            <!-- <v-img max-width="50px"
              src="https://www.patientpreviewapp.com/wp-content/uploads/2020/03/cropped-circle-logo.png">
            </v-img> -->
            Login
          </h1>
          <v-text-field outlined v-model="email" label="Email"></v-text-field>
          <v-text-field
            outlined
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn 
            large
            block
            color="primary"
            @click="login()">
            Login
          </v-btn>
          <p class="pt-5 pl-5 red--text" v-if="msg">{{ msg }}</p>
        </v-card>
      </v-col>
      <v-col cols="7">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from '../services/UserService'
import { store } from '../store/store'
import DiagonalStripes from '@/components/ui/DiagonalStripes'

export default {
  name: 'Login',
  components: {
    DiagonalStripes
  },
  data: () => ({
    store,
    password: '',
    email: '',
    showPassword: false,
    msg: ''
  }),
  created() {
    if(this.store && this.store.user.email) {
      this.email = this.store.user.email
    }
  },
  methods: {
    async login() {
      await UserService.login(this.email, this.password)
      .then(response => {
        this.$cookies.set('token', response.token)
        this.$router.push('/search')
      })
      .catch(err => {
        this.msg = 'Username or password is incorrect'
      })
    }
  }
}
</script>