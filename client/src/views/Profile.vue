<template>
  <v-container>
    <v-row>
      <v-col>
        <ProfileBasicInfo
          v-if="store"
          :user="store.user"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { store } from '@/store/store'
import ProfileBasicInfo from '@/components/ProfileBasicInfo.vue'

export default {
  name: 'Profile',
  components: {
    ProfileBasicInfo
  },
  data: () => ({
    store
  }),
  methods: {}
}
</script>
