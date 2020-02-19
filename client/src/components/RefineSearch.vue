<template>
  <v-card elevation="24">
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
          <v-checkbox v-model="selectedStates" :value="state.lname" @change="emitFilters()"></v-checkbox>
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
    states: statesJson,
    selectedStates: []
  }),
  computed: {
    filters() {
      var filters = {
        state: this.selectedStates
      }
      return filters
    }
  },
  methods: {
    emitFilters() {
      this.$nextTick(() => {
        this.$emit('filterschanged', this.filters)
      })
    }
  }
  
}
</script>