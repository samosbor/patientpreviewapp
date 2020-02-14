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
import { store } from '@/store/store'
import UserService from '@/services/UserService'
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
  created() {
    store.user = this.$auth.user
    this.setUp()
  },
  methods: {
    setLawsuits(event) {
      this.lawsuits = event
    },
    setFilters(event) {
      this.filters = event
    },
    async setUp() {
      const accessToken = await this.$auth.getTokenSilently()

      if (!store.userdata) {
        UserService.getUserData(accessToken, store.user.sub)
        .then(result => {
          store.userData = result
        })
      }
    }
  }
}
</script>