<template>
  <v-row class="pa-5">
    <v-col cols="3">
      <RefineSearch />
    </v-col>
    <v-col>
      <v-row>
        <SearchBox @searchresults="setLawsuits($event)"/>
      </v-row>
      <v-row>
        <LawsuitList v-bind:lawsuits="lawsuits"/>
      </v-row>
    </v-col>
  </v-row>
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