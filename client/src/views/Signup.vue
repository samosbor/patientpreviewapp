<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card class="pa-5">
          <h1 class="text-center">
            Standard Plan
          </h1>
          
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-5">
          Company users
          
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-5">
          <h1 class="text-center">
            Enterprise
          </h1>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { store } from '@/store/store'
export default {
  name: 'Admin',
  components: {
  },
  data: () => ({
    store: store,
  }),
  mounted() {
    this.setUp()
  },
  methods: {
  }
}
</script>