<template>
  <v-app>
    <Header/>
    <div>
    </div>
    <v-content class="stripes">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.stripes {
  background: linear-gradient(to right bottom, rgba(25, 118, 210, 0.8) 15%, rgb(131, 186, 241, 0.6) 70%, #ffffff 94%);
  /* transform: skewY(-12deg);
  transform-origin: 0; */
  position: absolute;
  width: 100%;
  height: 150%;
}
</style>