<template>
  <v-card width="100%">
    <v-list rounded>
      <v-subheader>Possible Matches</v-subheader>
      <v-list-item-group v-model="matches" color="primary">
        <v-list-item
          v-for="(lawsuit, i) in matches"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="lawsuit.Plaintiff"></v-list-item-title>
            <v-list-item-subtitle v-text="lawsuit.CaseName"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-spacer></v-spacer>
    <v-divider></v-divider>
    <v-list rounded>
      <v-subheader>Other results</v-subheader>
      <v-list-item-group v-model="nonMatches" color="primary">
        <v-list-item
          v-for="(lawsuit, i) in nonMatches"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="lawsuit.Plaintiff"></v-list-item-title>
            <v-list-item-subtitle v-text="lawsuit.CaseName"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'LawsuitList',
  props: {
    allLawsuits: Array,
    filters: Object
  },
  data: () => ({

  }),
  computed: {
    matches() {
      var matchesInProgress = this.allLawsuits
      matchesInProgress = this.removeNonRelevant(matchesInProgress)

      if(this.filters){
        if (this.filters.state && this.filters.state.length > 0) {
          matchesInProgress = this.filterStates(matchesInProgress)
        }
      }

      return matchesInProgress
    },
    nonMatches() {
      return this.allLawsuits.filter(lawsuit => {
        return !this.matches.includes(lawsuit)
      })
    }
  },
  methods: {
    removeNonRelevant(matchesInProgress) {
      return matchesInProgress.filter(lawsuit => {
        if (lawsuit && lawsuit.score > 0) {
          return lawsuit
        }
      })
    },
    filterStates(matchesInProgress) {
      return matchesInProgress.filter(lawsuit => {
        if (lawsuit && this.filters.state.toLowerCase().includes(lawsuit.state.toLowerCase())) {
          return lawsuit
        }
      })
    }
  }
}
</script>