<template>
  <v-content>
    <v-card elevation="10">
      <v-card-title>Subscription details</v-card-title>
      <v-divider />
      <v-skeleton-loader
        class="mx-auto"
        type="article"
        elevation="10"
        v-if="!loaded"
      ></v-skeleton-loader>
      <v-card-text class="pa-5 text-center" v-if="loaded">
        <div class="display-1 pb-5">{{ name }}</div>
        <div class="display-2">${{ price }}</div>
        <span class="font-weight-light">USD/Billed {{interval}}ly</span>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
import PaymentService from '../services/PaymentService'
export default {
  name: 'SignupCart',
  props: {
    planId: String,
    stripeKey: String
  },
  data: () => ({
    loaded: false,
    price: 0,
    currency: '',
    interval: '',
    name: '',
    productId: ''
  }),
  mounted() {
    this.getSubscription()
  },
  methods: {
    async getSubscription() {
      let productId = await PaymentService.getPlan(this.planId)
      .then(plan => {
        this.price = plan.data.amount/100
        this.currency = plan.data.currency
        this.interval = plan.data.interval
        this.productId = plan.data.product
        return this.productId
      })

      await PaymentService.getProduct(productId)
      .then(product => {
        this.name = product.data.name
        this.loaded = true
      })
    },
  }
}
</script>