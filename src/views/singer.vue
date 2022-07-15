<template>
    <div class="singer_box">
        <div class="top" v-for="(item, index) in tarBar" :key="index">
            <div class="title">{{ item.name }}</div>
            <div class="tarList" v-for="(tarItem, tarIndex) in item.list" :key="tarIndex">
                <div class="tar"
                    :class="{ 'tarName': (item.name == '筛选:'), active: selectArr[index].chooseIndex == tarIndex }"
                    @click="chooseSinger(item.type, tarIndex, tarItem.num)">{{ tarItem.name }}</div>
            </div>
        </div>
        <div class="singerList">
            <Loading size="24px" v-if="!singerList.length">加载中...</Loading>
            <Grid :gutter="10" :column-num="3" :icon-size="100">
                <GridItem v-for="(item,index) in singerList" :key="index" :icon="item.picUrl" :text="item.name" @click="goDetail(item.id)"/>
            </Grid>
        </div>
    </div>
</template>
    <script setup>
import { ref ,onMounted} from "vue";
import { SingerList} from '../api/singer'
import { Grid, GridItem,Loading } from 'vant';
import {useRouter} from 'vue-router'
const tarBar = ref([
    {
        name: "语种:",
        list: [{ name: "全部", num: -1 }, { name: "华语", num: 7 }, { name: "欧美", num: 96 }, { name: "日本", num: 8 }, { name: "韩国", num: 16 }, { name: "其他", num: 0 }],
        type: 'Languages'
    },
    {
        name: "分类:",
        list: [{ name: '全部', num: -1 }, { name: "男歌手", num: 1 }, { name: "女歌手", num: 2 }, { name: "乐队", num: 3 }],
        type: 'classification'

    },
    {
        name: "筛选:",
        list: [{ name: 'A', num: 'a' }, { name: 'B', num: 'b' }, { name: 'C', num: 'c' }, { name: 'D', num: 'd' }, { name: 'E', num: 'e' }, { name: 'F', num: 'f' }, { name: 'G', num: 'g' }, { name: 'H', num: 'h' },
        { name: 'I', num: 'i' }, { name: 'J', num: 'j' }, { name: 'K', num: 'k' }, { name: 'L', num: 'l' }, { name: 'M', num: 'm' }, { name: 'N', num: 'n' }, { name: 'O', num: 'o' }, { name: 'P', num: 'p' },
        { name: 'Q', num: 'q' }, { name: 'R', num: 'r' }, { name: 'S', num: 's' }, { name: 'T', num: 't' }, { name: 'U', num: 'u' }, { name: 'V', num: 'v' },
        { name: 'W', num: 'w' }, { name: 'X', num: 'x' }, { name: 'Y', num: 'y' }, { name: 'Z', num: 'z' }],
        type: 'screening'

    },
]);
const selectArr = ref([{chooseIndex:0,chooseItem:-1}, {chooseIndex:0,chooseItem:-1}, {chooseIndex:0,chooseItem:'a'}])
const singerList = ref([])
// const isShow=ref(false)
const router=useRouter()
onMounted(()=>{
    getSinger()
})
const chooseSinger = (type, chooseIndex, chooseItem) => {
    switch (type) {
        case 'Languages':
            selectArr.value[0].chooseIndex = chooseIndex;
            selectArr.value[0].chooseItem = chooseItem;
            break;

        case 'classification':
            selectArr.value[1].chooseIndex = chooseIndex;
            selectArr.value[1].chooseItem = chooseItem;
            break;
        case 'screening':
            selectArr.value[2].chooseIndex = chooseIndex;
            selectArr.value[2].chooseItem = chooseItem;
            break;
    }
    console.log("-------------------------------", selectArr.value)
    // isShow.value=true
    getSinger(selectArr.value[0].chooseItem, selectArr.value[1].chooseItem, selectArr.value[2].chooseItem)
}
const getSinger = async (area = '-1', type = '-1', initial = 'A') => {
    singerList.value=[]
    const res = await SingerList({
        limit: 66,
        initial: initial,
        type: type,
        area: area

    })
    console.log("歌手列表", res)
    singerList.value = res.data.artists
}
const goDetail=(id)=>{
        router.push({
            path:'/singerDetail',
            query:{
                id:id
            }
        })
}
</script>

<style lang="less" scoped>
.singer_box {
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1.3rem;

    .top {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0rem .2rem;
        margin-bottom: .3rem;

        .title {
            width: 1rem;
            font-weight: 600;
        }

        .tarList {
            flex: 1;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;

            .tar {
                color: #666;
            }

            .tarName {
                width: .4rem;
                margin-bottom: .2rem;
            }

            .active {
                color: rgb(247, 151, 88);
            }
        }
    }
    .singerList{
        --van-grid-item-content-padding:0rem;
    }
}
</style>
