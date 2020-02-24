<template>
  <v-row v-if="allResults.length > 0">
    <v-card class="ma-3" width="100%" elevation="24">
      <v-list v-if="matches.length > 0" v-model="matches" rounded>
        <v-subheader>Possible Matches</v-subheader>
          <v-list-item
            v-for="(lawsuit, i) in matches"
            :key="i"
            @click="$router.push('/lawsuit/'+lawsuit.id)"
          >
          <v-list-item-content>
            <v-list-item-title v-text="lawsuit.Plaintiff"></v-list-item-title>
            <v-list-item-subtitle v-text="lawsuit.CaseName"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-else class="pa-3">
        No Matches Found
      </div>
    </v-card>
    <v-card class="ma-3 mt-10" width="100%">
      <v-list v-if="nonMatches.length > 0" v-model="nonMatches" rounded color="grey lighten-2">
        <v-subheader>Other results</v-subheader>
          <v-list-item
            v-for="(lawsuit, i) in nonMatches"
            :key="i"
            color="white"
            @click="$router.push('/lawsuit/'+lawsuit.id)"
          >
          <v-list-item-content>
            <v-list-item-title v-text="lawsuit.Plaintiff"></v-list-item-title>
            <v-list-item-subtitle v-text="lawsuit.CaseName"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>
<script>
export default {
  name: 'LawsuitList',
  props: {
    allResults: Array,
    filters: Object
  },
  data: () => ({

  }),
  computed: {
    matches() {
      var matchesInProgress = this.allResults
      matchesInProgress = this.removeNonRelevant(matchesInProgress)

      if(this.filters){
        if (this.filters.state && this.filters.state.length > 0) {
          matchesInProgress = this.filterStates(matchesInProgress)
        }
      }

      return matchesInProgress
    },
    nonMatches() {
      return this.allResults.filter(lawsuit => {
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
        if (lawsuit.State && this.filters.state.includes(lawsuit.State.toLowerCase())) {
          return lawsuit
        }
      })
    }
  }
}
</script>