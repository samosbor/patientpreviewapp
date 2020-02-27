<template>
  <v-container fluid>
    <DiagonalStripes />
    <v-row class="px-5">
      <v-col cols="3" class="pa-5">
        <RefineSearch @filterschanged="setFilters($event)" />
      </v-col>
      <v-col cols="9" class="pa-5 px-8">
        <v-row>
          <SearchBox @searchresults="setResults($event)" />
        </v-row>
        <v-row class="py-5">
          <SearchResults :allResults="results" :filters="filters" />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import SearchResults from '@/components/SearchResults'
import RefineSearch from '@/components/RefineSearch'
import DiagonalStripes from '@/components/ui/DiagonalStripes'

export default {
  name: 'Search',
  components: {
    SearchBox,
    SearchResults,
    RefineSearch,
    DiagonalStripes
  },
  data: () => ({
    results: [],
    filters: {}
  }),
  created() {},
  methods: {
    setResults(event) {
      this.results = event
    },
    setFilters(event) {
      this.filters = event
    }
  }
}
</script>
