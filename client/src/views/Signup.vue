<template>
  <v-container fluid>
    <DiagonalStripes />
    <v-row>
      <v-col cols="4">
        <SignupCart class="mt-n11 ml-2" v-if="planId !== ''" :planId="planId"/>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-5 ma-5" elevation="24">
          <v-text-field
            v-model="email"
            ref="email"
            :rules="[rules.email, rules.required]"
            label="Email"
          ></v-text-field>
          <v-row>
            <v-text-field class="mx-3" v-model="name" :rules="[rules.required]" label="Name"></v-text-field>
            <v-text-field class="mx-3" v-model="company" :rules="[rules.required]" label="Company"></v-text-field>
          </v-row>
          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            v-model="password"
            class="input-group--focused"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <Card
            class="my-5"
            :class="{ complete }"
            :stripe="testKey"
            @change="complete = $event.complete"
          />
          <v-btn class="pay-with-stripe" @click="pay" :disabled="!complete">Pay with credit card</v-btn>
          <p class="pt-5 pl-5 red--text" v-if="msg">{{ msg }}</p>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay" opacity="0.8">
      <v-progress-circular v-if="!success" indeterminate size="64"></v-progress-circular>
      <v-card
        class="title pa-5"
        color="grey lighten-2 black--text"
        v-if="success"
      >Success! Redirecting to login</v-card>
    </v-overlay>
  </v-container>
</template>
<script>
import { store } from '@/store/store'
import { Card, createToken } from 'vue-stripe-elements-plus'
import DiagonalStripes from '@/components/ui/DiagonalStripes'
import { testKey } from '../../stripeConfig.json'
import UserService from '../services/UserService'
import SignupCart from '../components/SignupCart'

export default {
  name: 'Signup',
  components: {
    DiagonalStripes,
    Card,
    SignupCart
  },
  data: () => ({
    store,
    testKey,
    success: false,
    status: '',
    complete: false,
    email: '',
    name: '',
    company: '',
    password: '',
    planId: '',
    showPassword: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      email: v => /.+@.+/.test(v) || 'E-mail must be valid'
    },
    msg: '',
    overlay: false
  }),
  mounted() {
    this.planId = this.$route.params.planId
    this.$nextTick(() => {
      this.$refs.email.focus()
    })
  },
  methods: {
    async pay() {
      this.overlay = true
      createToken().then(data => {
        UserService.attemptSignup(
          this.email,
          this.name,
          this.company,
          this.password,
          data.token.id,
          this.planId
        )
          .then(response => {
            this.success = true
            setTimeout(() => {
              this.store.user = { email: this.email }
              this.$router.push('/login')
            }, 3000)
          })
          .catch(err => {
            this.overlay = false
            this.msg = err.response.data.response
          })
      })
    }
  }
}
</script>
