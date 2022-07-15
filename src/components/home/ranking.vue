<template>
    <div class="ranking">
        <div class="title">
            <div class="left">排行榜</div>
            <div class="right" @click="goRanking">更多
                    <Icon name="arrow" size="12" />
            </div>
        </div>
        <div class="content">
            <Swipe :loop="false" :width="300" :height="550" class="my_sw" :show-indicators="false">
                <SwipeItem v-for="(item, indexNum) in  rank.list" :key="indexNum">
                    <div class="ranking_item">
                        <div class="ranking_name" @click="goItemMusic(item.id)">
                            {{ item.name }}
                            <div class="icon">
                                <Icon name="arrow" size="20" />
                            </div>
                        </div>
                        <div class="item" v-for="(musicItem, index) in item.tracks" :key="index"
                            @click="playMusic(index, indexNum)">
                            <div class="img_box">
                                <img :src="musicItem.al.picUrl" alt="">
                            </div>
                            <div class="rank">{{ index + 1 }}</div>
                            <div class="name">{{ disposeName(musicItem.name) }}</div>
                            <text class="tetx_0">- {{ authorList(musicItem.ar) }}</text>
                        </div>
                    </div>
                </SwipeItem>
            </Swipe>
        </div>

    </div>

</template>

<script setup>
import { Swipe, SwipeItem, Icon } from 'vant';
import { musicToplist } from '../../api/ranking.js'
import { onMounted, reactive } from 'vue'
import { musicDetail } from '../../api/home.js'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
const rank = reactive({
    list: []
})
const store = useStore()
const router = useRouter()
onMounted(() => {
    getRanking()
})
const getRanking = async () => {
    //截取数组，slice()不改变原数组，splice()改变原数组，和截取字符串用法一样
    const res = await musicToplist({})
    rank.list = res.data.list.slice(0, 7)
    //构造数据格式
    rank.list.forEach(async item => {
        if (item.id) {
            const result = await musicDetail({
                id: item.id
            })

            item.tracks = result.data.playlist.tracks.slice(0, 4)
        }

    })
    console.log("排行榜", rank.list)
}
const authorList = (arr) => {  //拿到歌曲的作者
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
//处理名字
const disposeName = (str) => {
    if (str.length > 5) {
        return str.slice(0, 7) + "..."
    } else {
        return str
    }
}
const playMusic = (index, indexNum) => { //播放音乐
    store.commit("setPlayList", rank.list[indexNum].tracks)
    store.commit('changeMusic', index) //调用vux里的切换音乐的方法
}
//歌单详情
const goItemMusic = (id) => { //路由跳转
    router.push({
        name: "ItemMusic",
        query: {
            id: id
        }
    })
}
const goRanking = () => {
    router.push({
        name: 'rankingPage'
    })
}
</script>
<style lang="less" scoped>
.ranking {
    width: 100%;
    height: 7rem;
    background-color: #fff;
    margin-top: .3rem;
    border-radius: .2rem;
    padding-top: .3rem;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: .3rem;

        .left {
            font-size: .34rem;
            font-weight: 600;
        }

        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            height: .5rem;
            font-size: .24rem;
            border: 1px solid #e1e1ee;
            border-radius: .3rem;
            line-height: .5rem;
            margin-right: .3rem;
            padding: 0rem .2rem;

        }
    }

    .content {
        width: 100%;
        height: 100%;

        .my_sw {
            height: 100%;
            height: 100%;

            .ranking_item {

                height: 5.5rem;
                margin: 0 auto;
                margin-top: .2rem;
                box-shadow: 0rem 0rem .1rem rgba(0, 0, 0, 0.3), 0rem 0rem .1rem rgba(0, 0, 0, 0.3);
                border-radius: .2rem;
                box-sizing: border-box;
                padding-top: .2rem;
                margin-left: .5rem;

                .ranking_name {

                    font-size: .35rem;
                    font-weight: 600;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .icon {
                        margin-top: .06rem;
                    }
                }

                .item {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin-top: 0.12rem;

                    .img_box {
                        width: 1rem;
                        height: 1rem;
                        border-radius: .16rem;
                        overflow: hidden;
                        margin-left: .3rem;

                        img {
                            width: 1rem;
                            height: 1rem;
                            border-radius: .16rem;

                        }
                    }

                    .rank {
                        font-weight: 600;
                        font-size: .3rem;
                        margin-left: 0.15rem;
                    }

                    .name {
                        font-size: .3rem;
                        color: #000;
                        font-weight: 300;
                        font-family: Arial, Helvetica, sans-serif;
                        margin-left: -.5rem;
                        text-align: left;
                        margin-left: 0.15rem;


                    }

                    .tetx_0 {
                        color: rgb(202, 200, 200);
                        font-size: .25rem;
                        margin-left: .1rem;
                    }
                }
            }
        }
    }
}
</style>
