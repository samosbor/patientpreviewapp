<template>
  <v-container fluid>
    <div id="stripes" class="ma-n3">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <v-row class="px-5">
      <v-col cols="3" class="pa-5">
        <RefineSearch @filterschanged="setFilters($event)"/>
      </v-col>
      <v-col cols="9" class="pa-5 px-8">
        <v-row>
          <SearchBox @searchresults="setResults($event)"/>
        </v-row>
        <v-row class="py-5">
          <SearchResults 
            :allResults="results"
            :filters="filters"/>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import SearchBox from '@/components/SearchBox'
import SearchResults from '@/components/SearchResults'
import RefineSearch from '@/components/RefineSearch'
import { store } from '@/store/store'
import UserService from '@/services/UserService'
export default {
  name: 'Search',
  components: {
    SearchBox,
    SearchResults,
    RefineSearch
  },
  data: () => ({
    results: [],
    filters: {}
  }),
  created() {
    store.user = this.$auth.user
    this.setUp()
  },
  methods: {
    setResults(event) {
      this.results = event
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
<style scoped>
#stripes {
  transform: skewY(-12deg);
  transform-origin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid: repeat(8, 80px) / repeat(10, 1fr);
}

#stripes :nth-child(1) {
  grid-area: 1 / span 3 / auto / auto;
  background: #1976D2;
}

#stripes :nth-child(2) {
  grid-area: 4 / span 2 / auto / -1;
  background: #1976D2;
}

#stripes :nth-child(3) {
  grid-area: 7 / span 3 / auto / -1;
  background: #1976D2;
}

#stripes :nth-child(4) {
  grid-area: 8 / span 2 / auto / -1;
  background: #1976D2;
}

#stripes :nth-child(5) {
  grid-area: 6 / span 2 / auto / auto;
  background: #1976D2;
}

#stripes :nth-child(6) {
  grid-area: 7 / span 4 / auto / auto;
  background: #1976D2;
}
</style>