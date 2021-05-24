<template>
  <v-app>
    <v-main>
      <BibleVerse/>
      <v-footer fixed>
        The Bible, but Every Word is a Different Font. &copy;2021 <a href="https://chrisgreen.dev" class="ml-1">chrisgreen.dev</a>
        <span class="ml-auto">
          <a href="https://github.com/ChrisGreen89/thebiblebuteverywordisadifferentfont/" target="_blank"><i class="fab fa-github" /></a>
        </span>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import BibleVerse from './components/BibleVerse';

export default {
  name: 'App',

  components: {
    BibleVerse,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.v-application {
  background-color: #8ecae6 !important;
}
</style>