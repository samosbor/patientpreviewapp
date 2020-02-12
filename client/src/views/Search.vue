<template>
<v-container fluid>
  <v-row class="px-5">
    <v-col cols="3" class="pa-5">
      <RefineSearch @filterschanged="setFilters($event)"/>
    </v-col>
    <v-col class="pa-5 px-8">
      <v-row>
        <SearchBox @searchresults="setLawsuits($event)"/>
      </v-row>
      <v-row class="py-5">
        <LawsuitList 
          :allLawsuits="lawsuits"
          :filters="filters"/>
      </v-row>
    </v-col>
  </v-row>
</v-container>
</template>


<script>
import SearchBox from '@/components/SearchBox'
import LawsuitList from '@/components/LawsuitList'
import RefineSearch from '@/components/RefineSearch'
export default {
  name: 'Search',
  components: {
    SearchBox,
    LawsuitList,
    RefineSearch
  },
  data: () => ({
    lawsuits: [],
    filters: {}
  }),
  methods: {
    setLawsuits(event) {
      this.lawsuits = event
    },
    setFilters(event) {
      this.filters = event
    }
  }
}
</script>