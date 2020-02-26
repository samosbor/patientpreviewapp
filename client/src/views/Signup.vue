<template>
  <v-container fluid>
    <DiagonalStripes/>
    <v-row>
      <v-col cols="4">
        <v-card class="pa-5 text-center">
          <div class="display-1 pb-5">
            Standard
          </div>
          <div class="display-2">
            $100
          </div>
          <span class="font-weight-light">USD/Billed Monthly</span>
          
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
import DiagonalStripes from '@/components/ui/DiagonalStripes'
export default {
  name: 'Admin',
  components: {
    DiagonalStripes
  },
  data: () => ({
    store: store,
  }),
  mounted() {
  },
  methods: {
  }
}
</script>