<template>
  <v-card :loading="loading" width="100%" elevation="24">
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
    name: ''
  }),
  methods: {
    async makeSearch() {
      this.loading = 'warning'
      const accessToken = await this.$auth.getTokenSilently()

      SearchService.search(accessToken, this.name).then(result => {
        this.$emit('searchresults', result)
        this.loading = false
      })
    }
  }
}
</script>
