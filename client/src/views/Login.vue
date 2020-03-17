<template>
  <v-container fluid>
    <DiagonalStripes />
    <v-row>
      <v-col cols="5" class="mx-12">
        <v-card class="pa-5 ma-5" elevation="24">
          <h1 class="pb-5">Login</h1>
          <v-text-field outlined v-model="email" ref="email" label="Email"></v-text-field>
          <v-text-field
            outlined
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            v-model="password"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
            v-on:keyup.enter="login()"
          ></v-text-field>
          <v-btn large block color="primary" @click="login()">Login</v-btn>
          <p class="pt-5 pl-5 red--text" v-if="msg">{{ msg }}</p>
        </v-card>
      </v-col>
      <v-spacer />
      <v-col>
        <v-card class="pa-5 ma-5" elevation="10">
          <h1>Not a member yet?</h1>
          <v-btn class="mt-5" @click="signup()">Sign up now!</v-btn>
        </v-card>
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
    if (this.store && this.store.user.email) {
      this.email = this.store.user.email
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.email.focus()
    })
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
    },
    signup() {
      window.location.href = 'https://www.patientpreviewapp.com/signup'
    }
  }
}
</script>