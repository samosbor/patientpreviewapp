<template>
  <v-card
    :loading="loading"
    max-width="700px"
  >
    <v-card-title>
      Search For a Potential Patient
    </v-card-title>

    <v-text-field
      v-model="name"
      label="Patient Name"
      outlined
      class="pa-5"
    ></v-text-field>

    <v-card-actions>
      <v-btn @click="makeSearch()" text>Search</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import SearchService from '../services/SearchService'
export default {
  name: 'SearchBox',
  data: () => ({
    loading: false,
    name: ""
  }),
  methods: {
    async makeSearch() {
      this.loading = true
      const accessToken = await this.$auth.getTokenSilently()

      SearchService.search(accessToken, this.name)
      .then((result) => {
        console.log(result)
        this.$emit('searchresults', result)
        this.loading = false
      })
    }
    
  }
}

</script>