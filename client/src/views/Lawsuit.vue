<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="store.userData" width="100%" class="pa-5">
          <h1 class="text-center">
            Lawsuit Details
          </h1>

          <v-list v-if="lawsuitDetails" v-model="lawsuitDetails" rounded>
            <v-list-item
              v-for="(pair, i) in lawsuitDetails"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="pair[0]" class="font-weight-bold"></v-list-item-title>
                <div class="mt-1">
                  {{pair[1]}}
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { store } from '@/store/store'
import SearchService from '@/services/SearchService.js'
export default {
  name: 'Lawsuit',
  components: {
  },
  data: () => ({
    id: "",
    store: store,
    lawsuit: {},
  }),
  mounted() {
    this.id = this.$route.params.id;
    this.getLawsuit()
  },
  computed: {
    lawsuitDetails() {
      return Object.entries(this.lawsuit).filter(pair => {
        return pair[1] && pair[0] !== "id"
      })
    }
  },
  methods: {
    async getLawsuit() {
      const accessToken = await this.$auth.getTokenSilently()
      SearchService.getLawsuit(accessToken, this.id)
      .then(response => {
        this.lawsuit = response
      })
    }
  }
}
</script>