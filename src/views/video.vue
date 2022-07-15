<template>
    <div class="mv_box">
        <div class="topBar">
            <div class="item" :class="{ 'active': current == index }" v-for="(item, index) in tarBar" :key="index"
                @click="change(index, item)">{{ item }}</div>
            <div class="more">
                <Icon name="arrow" size="15" @click="router.push({name:'allMV'})" />
            </div>

        </div>
        <div class="mv_list">
            <Loading vertical v-if="isLoading" color="#0094ff">加载中...</Loading>
            <mv_itemVue v-for="(item, index) in mv.list" :key="index" :mvItem="item" :iSHorizontally="false" @click="openMvDetail(item.id)"></mv_itemVue>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive} from 'vue'
import mv_itemVue from '../components/mv/mv_item.vue';
import { Loading,Icon} from 'vant'
import {useRouter} from 'vue-router'
import {musicMv} from "../api/mv"
const router=useRouter()
const tarBar = ref(['最新Mv', '内地', '港台', '欧美', '日本', '韩国'])
const current = ref(0)
const mv = reactive({
    list: [],
    msList: [],
    mvDetail:[],
    comment:[]
})
const isLoading = ref(false)
const change = (index, item) => {
    current.value = index
    mv.list = []
    isLoading.value = true
    getMv(item)
}
onMounted(() => {
    getMv()
})
const openMvDetail=(id)=>{
   router.push({
        path: "/videoDetail",
        query:{id:id}
    })
}
const getMv = async (area) => {
    if (area == "最新Mv") {
        area = ''
    }
    const res = await musicMv({
        area: area,
        limit: 30
    })
    console.log('mv', res)
    mv.list = res.data.data
    isLoading.value = false
}

</script>

<style lang="less" scoped>
.mv_box {
    width: 100%;
    margin-top: 1.6rem;
    box-sizing: border-box;
    padding-bottom: 1rem;

    .topBar {
        width: 100%;
        height: .5rem;
        display: flex;
        align-items: center;
        margin-top: 1rem;

        justify-content: space-around;
        position: fixed;
        top: 0rem;
        background-color: #fff;
        z-index: 55;

        .item {}

        .active {
            border-bottom: .04rem;
            color: #D59F9D;
        }
    }

    .mv_list {
        margin-top: .3rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>
