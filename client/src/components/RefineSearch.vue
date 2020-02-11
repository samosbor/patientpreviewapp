<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          Refine Your Search
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-group
      dense
      nav
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>State</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
          v-for="(state, i) in states"
          :key="i"
          dense
        >
          <v-list-item-title v-text="state.name"></v-list-item-title>
      </v-list-item>

    </v-list-group>
  </v-card>
</template>

<script>
import statesJson from '../assets/states'
export default {
  name: 'RefineSearch',
  data: () => ({
    states: statesJson
  }),
  methods: {
    setState(event) {
      this.lawsuits = event
    }
  }
  
}
</script>