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
      <v-col cols="4">
        <v-card class="pa-5">
          <Card
            :class="{ complete }"
            :stripe="testKey"
            @change="complete = $event.complete"
          />
          <button class="pay-with-stripe" @click="pay" :disabled="!complete">
            Pay with credit card
          </button>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-5">
          <h1 class="text-center">Enterprise</h1>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { store } from '@/store/store'
import { Card } from 'vue-stripe-elements-plus'
import DiagonalStripes from '@/components/ui/DiagonalStripes'
import { testKey } from '../../stripeConfig.json'

export default {
  name: 'Admin',
  components: {
    DiagonalStripes,
    Card
  },
  data: () => ({
    store,
    testKey,
    submitted: false,
    status: ''
  }),
  mounted() {},
  methods: {}
}
</script>
