<template>
  <v-card>
    <v-list rounded>
      <v-subheader>Results</v-subheader>
      <v-list-item-group v-model="lawsuits" color="primary">
        <v-list-item
          v-for="(lawsuit, i) in lawsuits"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="lawsuit.Plaintiff"></v-list-item-title>
            <v-list-item-subtitle v-text="lawsuit.CaseName"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: 'LawsuitList',
  props: {
    lawsuits: Array
  },
  data: () => ({
    
  }),
  methods: {
    
  }
}
</script>