<template>
  <div class="home"> 
    <swiperTop></swiperTop>
    <icon></icon>
    <findMusic></findMusic>
    <newMusic></newMusic>
    <ranking></ranking>
  </div>
</template>

<script setup>
import swiperTop from "../components/home/swiperTop.vue"
import icon from "../components/home/icon.vue"
import findMusic from "../components/home/findMusic.vue"
import newMusic from "../components/home/newMusic";
import ranking from "../components/home/ranking.vue";
</script>


<style lang="less" scoped>
.home {
  width: 100%;
  height:calc(100vh - 1rem);
  box-sizing: border-box;
  padding-top: 0.8rem;
  overflow-y: scroll;
  background-color: #f0f0f0;
  padding-bottom: 1rem;
}
</style>
