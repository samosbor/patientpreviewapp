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

      <v-select
        v-model="selectedStates"
        :items="states"
        item-text="name"
        item-value="lname"
        label="Refine By State"
        class="pa-4"
        multiple
        persistent-hint
        single-line
        hint="States"
        @change="emitFilters()"
      ></v-select>
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