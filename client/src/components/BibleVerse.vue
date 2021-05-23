<template>
  <v-container fluid class="mx-0" fill-height :style="{background: gradient}">
    <v-row class="text-center" fill-height>
      <v-col cols="12" md="4" offset-md="4">
        <v-fade-transition>
        <v-card v-if="verseLoaded">
          <v-card-title>
            {{verse.bookname}} {{verse.chapter}}:{{verse.verse}}
          </v-card-title>
          <v-card-text>
            <p>
            <template v-for="(word, i) in verseWords">
               <v-tooltip :key="i" top>
                  <template v-slot:activator="{on}">

                  <div @click.stop.prevent="handleNavigateToGoogleFont(fontFamilies[i])" v-on="on" style="display: inline;cursor: pointer;" :style="`font-family: ${fontFamilies[i]} !important; font-size: 20px !important;`" class="subtitle-1" :key="i">
                    {{word}}&nbsp;</div>
                  </template>
                  <span>{{fontFamilies[i]}}</span>
               </v-tooltip>
              
            </template>
            </p>
          </v-card-text>
        </v-card>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {getFonts, getVerse} from '@/utils/api'
  export default {
    name: 'BibleVerse',
    data() {
      return {
        colors: [],
        verse: null,
        verseLoaded: false,
        verseWords: [],
        fonts: [],
        fontFamilies: []
      }
    },
    computed: {
      gradient() {
        debugger
        let colors = "linear-gradient(45deg";
        this.colors.forEach(function(e) {
          colors += "," + e;
        });
        colors += ")";
        return colors;
      }
    },
    async mounted() {
      this.generateGradientBg();
      // Query verse
      const verse = await getVerse();
      this.verse = verse.data[0]
      
      this.verseWords = this.verse.text.split(' ');
      const fonts = await getFonts(this.verseWords.length)
      this.fonts = fonts.data;
      this.fontFamilies = this.fonts.map(x=>x.family);
      await WebFont.load({
        google: {
          families: this.fontFamilies
        }
      })
      this.verseLoaded = true;
    },
    methods: {
      generateGradientBg(numColors = 2) {
        this.colors = []
        for (var i = 0; i < numColors; i++) {
          this.colors.push(this.randomHex())
        }
      },
      handleNavigateToGoogleFont(font) {
        window.open("https://fonts.google.com/specimen/" + font, "_blank")
      },
      randomHex() {
        return (
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8)
        );
      },
    }
  }
</script>
<style lang="scss">
.slide-fade-enter-active {
  transition: all 2s ease;
}

.wordLink {
  text-decoration: none;
  
}
</style>