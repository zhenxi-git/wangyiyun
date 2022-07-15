<template>
    <div class="rankingPage">
        <div class="top">
            <svg class="icon" aria-hidden="true" @click="router.go(-1)">
                <use xlink:href="#icon-fanhui1"></use>
            </svg>
            排行榜
        </div>
        <div class="name">全部榜单</div>
        <div class="rank_list">
            <div class="ranking_item" v-for="(item, index) in ranking.list" :key="index"
                :style="'background-color:' + bgColor[random(0, 4)]" @click="goItemMusic(item.id)">
                <div class="left">
                    <div class="ranking_name">
                        {{ item.name }}
                    </div>
                    <div class="img_box">
                        <img :src="item.tracks[0].al?item.tracks[0].al.picUrl:imgSrc" alt="">
                    </div>
                </div>
                <div class="right">
                    <div class="right_item" v-for="(musicItem, mindex) in item.tracks" :key="mindex">
                        <div class="num">{{ mindex + 1 }}.</div>
                        <div class="right_name">{{ disposeName(musicItem.name) }}</div>
                        <div class="ar"> - {{ authorList(musicItem.ar) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="other_rank">
            <div class="item" v-for="item in ranking.otherList" :key="item.id" @click="goItemMusic(item.id)">
                <div class="img_box">
                    <img :src="item.coverImgUrl" alt="">
                </div>
                <div class="name">
                {{item.name}}
                </div>
                <div class="time">{{item.updateFrequency}}</div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { musicToplistDetail } from '../api/ranking.js'
import { musicDetail } from '../api/home.js'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const bgColor = ref(['#E0EAE9', '#F3E0E6', '#E3E7F0', '#F2E5DF', '#EBDFF5'])
onMounted(() => {
    getRankDetail()
})
const router = useRouter()
const ranking = reactive({
    list: [],
    otherList:[]
})
const imgSrc=ref('')
const getRankDetail = async () => {
    const res = await musicToplistDetail({})
    ranking.list = res.data.list.slice(0, 4)
    ranking.otherList=res.data.list.slice(4,res.data.list.length)
    ranking.list.forEach(async item => {
        const result = await musicDetail({
            id: item.id
        })

        item.tracks = result.data.playlist.tracks.slice(0, 3)
    })
    console.log("所有榜单", res)
}
const random = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1) + a)
}
const authorList = (arr) => { //拿到歌曲的作者
    if (arr) {
        let str = arr[0].name
        if (arr.length > 1) {
            if (str.length > 5) {
                return str.slice(0, 6) + '...'
            } else {
                return str + '...'
            }
        } else {
            if (str.length > 5) {
                return str.slice(0, 6) + '...'
            } else {
                return str
            }
        }
    }
}
const disposeName = (str) => {
    if (str.length > 5) {
        return str.slice(0, 7) + "..."
    } else {
        return str
    }
}
const goItemMusic=(id)=>{ //路由跳转
        router.push({
            name:"ItemMusic",
            query:{
                id:id
            }
        })
}
</script>
<style lang="less" scoped>
.rankingPage {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 1.2rem;

    .top {
        width: 100%;
        height: 1rem;
        line-height: 1;
        text-align: left;
        padding: .3rem;
        font-weight: 600;

        .icon {}
    }

    .name {
        width: 100%;
        height: .8rem;
        font-size: .35rem;
        font-weight: 600;
        text-align: center;
    }

    .rank_list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .ranking_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 85%;
            height: 2.5rem;
            border-radius: .2rem;
            margin-top: .3rem;

            .left {
                margin-left: .3rem;
                width: 2rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-around;

                .ranking_name {
                    font-size: .3rem;
                    font-weight: 600;
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                    margin-bottom: .1rem;
                }

                .img_box {
                    width: 1.3rem;
                    height: 1.3rem;

                    img {
                        width: 1.3rem;
                        height: 1.3rem;
                    }
                }
            }

            .right {
                flex: 1;
                margin-top: .4rem;
                .right_item {
                    display: flex;
                    align-items: center;

                    .num {
                        margin-left: -0.26rem;
                    }

                    .right_name {
                        font-size: .3rem;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #2B2F2F;
                    }

                    .ar {
                        color: #999;
                        font-size: 0.22rem;
                    }
                }
            }
        }

    }
    .other_rank{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-around;
        align-items: center;
        width: 85%;
        margin: 0 auto;
       
        .item{
            width: 2rem;
            height: 2.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin-top: .5rem;
             position: relative;
        .img_box{
            width: 2rem;
            height: 2rem;
            background-color: #999;
            img{
                width: 2rem;
                height: 2rem;
            }
        }
        .name{
            font-size: 0.26rem;
            font-weight: 400;
            font-family: 'Courier New', Courier, monospace;
            margin-top: .16rem;
            text-align: left;
        }
        .time{
            position: absolute;
            bottom: .5rem;
            color: #f0f0f0;
            font-size: .24rem;
        }
        }
    }
}
</style>
