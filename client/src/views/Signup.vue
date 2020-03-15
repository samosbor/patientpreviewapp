<template>
  <v-container fluid>
    <DiagonalStripes />
    <v-row>
      <v-col cols="4">
        <v-card class="pa-5 text-center">
          <div class="display-1 pb-5">Standard</div>
          <div class="display-2">$100</div>
          <span class="font-weight-light">USD/Billed Monthly</span>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-5 ma-5">
          <v-text-field v-model="email" :rules="[rules.email]" label="Email"></v-text-field>
          <v-row>
            <v-text-field class="mx-3" v-model="name" label="Name"></v-text-field>
            <v-text-field class="mx-3" v-model="company" label="Company"></v-text-field>
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
          <v-btn class="pay-with-stripe" @click="pay" :disabled="!complete">
            Pay with credit card
          </v-btn>
          <p class="pt-5 pl-5 red--text" v-if="msg">{{ msg }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { store } from '@/store/store'
import { Card, createToken } from 'vue-stripe-elements-plus'
import DiagonalStripes from '@/components/ui/DiagonalStripes'
import { testKey } from '../../stripeConfig.json'
import UserService from '../services/UserService'
import router from '../router'

export default {
  name: 'Signup',
  components: {
    DiagonalStripes,
    Card
  },
  data: () => ({
    store,
    testKey,
    submitted: false,
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
      email: v => /.+@.+/.test(v) || "E-mail must be valid"
    },
    msg: ''
  }),
  mounted() {
    this.planId = this.$route.params.planId
  },
  methods: {
    pay() {
      createToken().then(data => {
        UserService.attemptSignup(this.email, this.name, this.company, this.password, data.token.id, this.planId)
        .then(response => {
          console.log(response)
          this.store.user = {email: this.email}
          router.push('/login')
        })
        .catch(err => {
          this.msg = err.response.data.response
        })
      })
    }
  }
}
</script>
