<template>
    <div class="video_box">
        <mvDetails @closeDetail="closeDetail" :msList="music.msList" :mvDetail="music.mvDetail" :url="url"
            @getComment="getComment" @goDetail="goDetail" :comments="music.comment"></mvDetails>
    </div>
</template>
<script setup>
import mvDetails from '../components/mv/mvDetail.vue';
import { reactive, ref,onMounted,provide} from 'vue';
import { mvDetail, mvUrl, mvSong, mvComment } from '../api/mv.js'
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
const store=useStore()
const route=useRoute()
const  router =useRouter()
const music = reactive({
    msList: [],
    mvDetail: [],
    comment: []
})
const url = ref('')
let mvId=route.query.id
const id=ref(null)
id.value=route.query.id
console.log('mv的视频id',mvId)
provide('mvId', id)
onMounted(()=>{
    getComment(mvId)
    getMvDetail(mvId)
    getUrl(mvId)
    gteSong(mvId)
    store.commit('changePlay',true)
})
const closeDetail=()=>{
    router.back(-1)
}
const goDetail = (id) => {
    getComment(id)
    getMvDetail(id)
    getUrl(id)
    gteSong(id)
    store.commit('changePlay',true)
}
//mv详情
const getMvDetail = async (id) => {
    const res = await mvDetail({
        mvid: id
    })
    music.mvDetail = res.data.data
    console.log("mv详情", res)
}
//mv播放地址
const getUrl = async (id) => {
    const res1 = await mvUrl({
        id: id

    })
    url.value = res1.data.data.url
    console.log("url", res1)
}
//相似mv
const gteSong = async (id) => {
    const res2 = await mvSong({
        mvid: id
    })
    console.log("相似mv", res2)
    music.msList = res2.data.mvs
}
//获取mv评论
const getComment = async (id, sortType = 1) => {
    music.comment = []
    const res = await mvComment({
        id: id,
        pageNo: 1,
        pageSize: 66,
        type: 1,
        sortType: sortType
    })
    music.comment = res.data.data.comments
    console.log("评论", res)

}
</script>