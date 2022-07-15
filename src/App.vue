<template>
 <TopNav v-if="store.getters.getBottom"></TopNav>
  <router-view />
  <footerMusicVue  v-show="store.getters.getIsFull"></footerMusicVue>
</template>
<script setup>
import footerMusicVue from './components/footerMusic/FooterMusic.vue';
import TopNav from "./components/home/TopNav.vue";
import { useStore } from 'vuex';
const store=useStore()
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}

.icon {
  width: .4rem;
  height: .4rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
   font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
