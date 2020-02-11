<template>
  <v-container>
    <v-col>
      <RefineSearch />
    </v-col>
    <v-col>
      <v-row justify="center">
        <SearchBox @searchresults="setLawsuits($event)"/>
      </v-row>
      <v-row justify="center">
        <LawsuitList v-bind:lawsuits="lawsuits"/>
      </v-row>
    </v-col>
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
    lawsuits: []
  }),
  methods: {
    setLawsuits(event) {
      this.lawsuits = event
    }
  }
}
</script>