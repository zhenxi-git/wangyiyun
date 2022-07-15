<template>
  <div class="toNav">
    <div class="left">
      <svg class="icon" aria-hidden="true" @click="openPopup">
        <use xlink:href="#icon-daohang"></use>
      </svg>
    </div>
    <div class="content">
      <div v-for="(item, index) in tarList" :class="{ active: current == index }" @click="changeIndex(index, item.path)"
        :key="index">{{ item.name }}</div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true" @click="goSearch">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
  <Popup v-model:show="show"  position="left" :style="{ height: '100%',width:'70%' }" />
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"
import { Popup } from 'vant';
const router = useRouter()
const show=ref(false)
const goSearch = () => {
  router.push({
    name: "Search"
  })
}
const openPopup=()=>{
  show.value=true
}
let current = ref(1)
const tarList = ref([{ name: "我的", path: '/infoUser' }, { name: "发现", path: '/' }, { name: "歌手", path: '/singer' }, { name: "视频", path: '/video' }])
const changeIndex = (index, name) => {
  current.value = index
  router.push({
    path: name
  })
}
</script>

<style scoped lang="less">
.toNav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 66;
  background-color: #fff;
  height: 1rem;

  .left {
    width: .8rem;

    .icon {}
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      margin: 0rem .1rem;
      font-size: 0.36rem;
    }

    .active {
      font-weight: 600;
    }
  }

  .right {
    width: .8rem;

    .icon {}
  }
}
</style>
