<template>
  <v-container fluid class="mx-0" fill-height :style="{background: gradient}">
    <v-row class="text-center" fill-height>
      <v-col cols="12" md="4" offset-md="4">
        <v-slide-y-transition>
        <v-card v-if="verseLoaded">
          <v-card-title>
            {{verse.bookname}} {{verse.chapter}}:{{verse.verse}}
          </v-card-title>
          <v-card-text>
            <p>
            <template v-for="(word, i) in verseWords">
               <v-tooltip :key="i" top>
                  <template v-slot:activator="{on}">

                  <div @click.stop.prevent="handleNavigateToGoogleFont(fonts[i])" v-on="on" style="display: inline;cursor: pointer;" :style="`font-family: ${fonts[i]} !important; font-size: 20px !important;`" class="subtitle-1" :key="i">
                    {{word}}&nbsp;</div>
                  </template>
                  <span>{{fonts[i]}}</span>
               </v-tooltip>
              
            </template>
            </p>
          </v-card-text>
        </v-card>

        </v-slide-y-transition>
        <div v-if="verseLoaded && !hideUi" class="mt-4">
           <v-btn color="white" class="mx-1" @click.stop.prevent="handleReadAnotherVerse" v-if="verseLoaded">Read another verse</v-btn>
           <v-btn color="white" class="mx-1" href="https://github.com/ChrisGreen89/thebiblebuteverywordisadifferentfont" v-if="verseLoaded"><i class="fab fa-github mr-1" />View on GitHub</v-btn>
        </div>
        <template v-if="!verseLoaded">
            <p class="white--text">Loading verse...</p>
        </template>
      </v-col>
    </v-row>
    <img src="https://thebiblebuteverywordisadifferentfont.azurewebsites.net/ogimage.png" style="display: none;" />
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
        hideUi: false,
        fonts: [],
        manualFonts: false
      }
    },
    computed: {
      gradient() {
        let colors = "linear-gradient(45deg";
        this.colors.forEach(function(e) {
          colors += "," + e;
        });
        colors += ")";
        return colors;
      }
    },
    async mounted() {
      // Generate a potentially gross gradient background. Is very Christian.
      this.generateGradientBg();

      // Do we have a requested verse?
      let uri = window.location.search;
      let params = new URLSearchParams(uri);

      // If we're given a list of font families, use those
      if (params.get("fonts")) {
        this.fonts = params.get("fonts")?.split(",")
      }

      // Tell our parent component to update its UI
      this.hideUi = params.get("hideUi") == "true" || params.get("hideUi") == 1
      this.$emit("hideUi", this.hideUi)

      // Ok, we're set up, let's load a verse
      await this.loadVerse(params.get('verse'))
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
      handleReadAnotherVerse() {
        this.generateGradientBg();
        this.loadVerse();
      },
      async loadVerse(verseParam = null) {
        this.verseLoaded = false
        
        // Query verse
        const verseQuery = await getVerse(verseParam, this.fonts);
        this.verse = verseQuery.data?.verse
        this.fonts = verseQuery.data?.fonts
        console.log(this.verse)
        this.verseWords = this.verse.text?.split(' ')
        await WebFont.load({
          google: {
            families: this.fonts
          }
        })
        this.verseLoaded = true;
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