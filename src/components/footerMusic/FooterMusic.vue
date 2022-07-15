<template>
    <div class="footerMusic">
        <div class="footer_left" @click="openDetail">
            <div class="img_box">
                <img :src="store.getters.getPlayList[store.getters.getIndex].al.picUrl" alt="">
            </div>
            <div class="text_center">
                <div class="name">
                    {{ store.getters.getPlayList[store.getters.getIndex].name }}</div>
                <div class="miaoshu">正在播放的歌曲{{ store.getters.getIndex }}</div>
            </div>
        </div>

        <div class="footer_right">
            <div class="bofang" @click="play(false)" v-if="store.getters.getIsPlay">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
            </div>
            <div class="bofang" @click="play(true)" v-else>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zanting1"></use>
                </svg>
            </div>
            <div class="menu">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-caidan"></use>
                </svg>
            </div>
        </div>
        <audio ref="audio" @timeupdate="upDateTimes"
            :src="`https://music.163.com/song/media/outer/url?id=${store.getters.getPlayList[store.getters.getIndex].id}.mp3`"></audio>

        <Popup v-model:show="store.getters.getDetail" position="right" :style="{ height: '100%', width: '100%' }">
            <!-- 子组件调用父组件的方法：父组件在子组件的上定义自定义事件 @playMusic="play"，然后子组件通过自定义事件调用-->
            <musicDetailVue :musicList="store.getters.getPlayList[store.getters.getIndex]" @playMusic="play"
                @getDuration="getMusicDuration" @dragStart="dragStart" @dragEnd="dragEnd" @changeTime="changeTime"></musicDetailVue>
        </Popup>
    </div>
</template>
<script setup>
import { useStore } from "vuex" //从vuex中引入useStore
import { ref, onMounted, computed, watch, onUpdated } from 'vue'
import { Popup } from 'vant'
import musicDetailVue from "../musicDetail/musicDetail.vue";
const store = useStore()
const playId = ref()
const audio = ref()
const name = ref('')
const picUrl = ref('')
const isRanges = ref(false) //是否进行拖拽
onMounted(() => { // 数据初始化
    playId.value = store.getters.getPlayList[store.getters.getIndex].id
    name.value = store.getters.getPlayList[store.getters.getIndex].name
    picUrl.value = store.getters.getPlayList[store.getters.getIndex].al.picUrl
    console.log("音乐播放器", audio) //currentTime属性当前歌曲播放到多少毫秒，duration歌曲的总时长

})
const playIndexId = computed(() => {  //把id写成计算属性，然后方便监听
    return store.getters.getPlayList[store.getters.getIndex].id
})
const changeTime = (time) => {
    audio.value.currentTime = time
}
//拖拽开始
const dragStart=()=>{
    isRanges.value = true
}
//拖拽结束
const dragEnd=()=>{
    isRanges.value=false
}
watch(playIndexId, () => { //监听playIndexId，当playIndexId发生变化时做一系列的事
    audio.value.autoplay = true  //歌曲自动播放
    store.commit('changePlay', false) // 暂停按钮变成播放按钮
})
const play = (state) => {
    console.log(audio.value.paused, state)
    if (audio.value.paused) { //判断音乐是否是暂停状态
        audio.value.play()
        store.commit("changePlay", state)
    } else {
        audio.value.pause()
        store.commit("changePlay", state)
    }

}
const upDateTimes = () => { //播放时间更新的事件，当播放时间改变时就会被调用
    if (!isRanges.value) {
        console.log(audio.value.currentTime * 1000)
        store.commit("changeTime", audio.value.currentTime)
    }
  
    

}
const openDetail = () => { //打开歌曲详情页
    store.commit("changeDetail", true)
    store.commit('setBottom', false)
}
//获取歌曲的总时长
const getMusicDuration = () => {
    store.commit("changeDuration", audio.value.duration)
}
onUpdated(() => {//歌曲一更改就立马获取到歌词
    store.dispatch("getMusicLyric", playIndexId.value)
    getMusicDuration()
})
</script>
<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    right: 0rem;
    border-top: 1px solid #f0f0f0;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    z-index: 99999;

    .footer_left {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .img_box {
            width: 1rem;
            height: 100%;
            margin-left: .12rem;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;


            }
        }

        .text_center {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            margin-left: .2rem;

            .name {
                width: 66%;
                font-weight: 600;
                font-size: .34rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                text-align: left;
            }

            .miaoshu {
                color: #999;
                font-size: .28rem;
            }
        }
    }

    .footer_right {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .bofang {
            .icon {}
        }

        .menu {
            margin-right: .1rem;

            .icon {}
        }
    }
}
</style>
