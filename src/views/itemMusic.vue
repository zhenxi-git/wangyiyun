<template>
    <div>
        <itemMusic_top :playlist="playlists.playDetails" @openPopup="openPopup"></itemMusic_top>
        <itemMusic_bottom :id="route.query.id" :subscribedCount="playlists.playDetails.subscribedCount"></itemMusic_bottom>
        <Popup v-model:show="isTrue" position="bottom" :style="{ height: '100%', width: '100%' }">
            <div class="box">
                <div class="top">
                    <svg class="icon" aria-hidden="true" @click="closePoupr">
                        <use xlink:href="#icon-fanhui1"></use>
                    </svg>
                    <div class="text_0">
                        评论<!-- ({{ replyComment.length }}) -->
                    </div>
                </div>
                    <comment :comments="item" v-for="(item,index) in playlists.comment" :key="index" :type="2"></comment>
            </div>
        </Popup>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router"
import { musicDetail } from '../api/home.js'
import{mvComment} from '../api/mv'
import { onMounted, reactive,ref,provide} from 'vue'
import itemMusic_top from '../components/itemMusic/itemMusic_top.vue'
import itemMusic_bottom from "../components/itemMusic/itemMusic_bottom.vue"
import { Popup } from 'vant'
import comment from "../components/mv/comment.vue"
const isTrue=ref(false)
const route = useRoute()
let playlists = reactive({
    playDetails: {},
    comment:[]
})
provide('mvId', route.query.id)
onMounted(() => {
    console.log(route.query)
    getMusicDetail()
})
const openPopup=()=>{
    isTrue.value=true
    getComment(playlists.playDetails.id)
}
const getMusicDetail = async () => {
    const res = await musicDetail({
        id: route.query.id
    })
    playlists.playDetails = res.data.playlist
    console.log("详情", playlists.playDetails)
}
const closePoupr=()=>{
     isTrue.value=false
}
//获取歌单评论
const getComment = async (id,sortType=1) => {
    playlists.comment=[]
    const res = await mvComment({
        id: id,
        pageNo: 1,
        pageSize: 66,
        type: 2,
        sortType:sortType
    })
    playlists.comment = res.data.data.comments
    console.log("评论", res)

}
</script>
<style lang="less">
    .box{
        width: 100%;
        height: 100%;
        padding-top: 1rem;
          .top {
        width: 100%;
        height: 1rem;
        background-color: #fff;
        display: flex;
        align-items: center;
        position: fixed;
        top:0rem;
        border-radius: .3rem;

        .icon {
            margin-left: .5rem;
        }

        .text_0 {
            margin-left: 0.4rem;
        }
    }
    }

</style>