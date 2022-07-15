<template>
    <div class="findMusic">
        <div class="title">
            <div class="left">
                发现好歌单
            </div>
            <div class="right">
                查看更多
                <Icon name="arrow" size="12"></Icon>
            </div>
        </div>
        <div class="swiper_box">
            <Swipe :loop="false" :width="100" class="my_swiper" :show-indicators="false">
                <SwipeItem v-for="(item, index) in imgList" :key="index" @click="goItemMusic(item.id)">
                    <div class="item_Box">
                        <img :src="item.picUrl" alt="">
                        <div class="top">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-bofangliang"></use>
                            </svg>
                            <span class="playCount">{{ changeNum(item.playCount) }}</span>
                        </div>

                    </div>
                    <div class="name">{{ item.name }}</div>
                </SwipeItem>

            </Swipe>
        </div>

    </div>
</template>
<script setup>
import { personalized } from "../../api/home.js"
import { onMounted, ref } from "vue"
import { Swipe, SwipeItem,Icon} from 'vant';
import { useRouter} from "vue-router"
const router=useRouter()
const imgList = ref([])
onMounted(() => {
    getMusic()
})
const getMusic = async () => {
    const res = await personalized({
        limit: 10
    })
    console.log("歌单", res)
    imgList.value = res.data.result
}

const changeNum = (element) => { //处理播放量
    if (element >= 100000000) {
        return (element / 100000000).toFixed(2) + "亿"
    } else if (element >= 10000) {
        return (element / 10000).toFixed(2) + "万"
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
.findMusic {
    width: 100%;
    margin: 0 auto;
    // box-shadow:0.1rem 0.05rem 0rem 0rem rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: .1rem;
    border-bottom-right-radius: .1rem;
    background-color: #fff;
    padding-top: .2rem;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: .3rem;
        .left {
            font-size: .38rem;
            font-weight: 600;
        }

        .right {
            height: .5rem;
            font-size: .24rem;
            border: 1px solid #e1e1ee;
            border-radius: .3rem;
            line-height: .5rem;
            padding: 0 .1rem;
            margin-right: .3rem;

        }
    }

    .swiper_box {
        width: 100%;
        height: 2.8rem;
        margin-top: .2rem;

        .my_swiper {
            height: 100%;
            .item_Box {
                position: relative;
                border-radius: .2rem;
                margin: 0rem .12rem;
                overflow: hidden;
                width: 1.76rem;
                height: 1.76rem;
                border: .02rem solid #eee;

                img {
                    width: 100%;
                    height: 100%;
                }

                .icon {
                    color: #FFF;
                    width: 0.4rem;
                    height: 0.4rem;
                }
                .top{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 0;
                    left: .2rem;
                }
                .playCount {
                    color: #FFF;
                    font-size: .24rem;
                    margin-left: .04rem;
                }
            }

            .name {
                display: -webkit-box;
                /* 将对象作为弹性伸缩盒子模型显示 */
                -webkit-box-orient: vertical;
                /* 设置或检索伸缩盒对象的子元素的排列方式 */
                -webkit-line-clamp: 2;
                /* 2行，只有 webkit内核支持 */
                word-break: break-all;
                /* 纯英文换行 */
                overflow: hidden;
                height: 0.7rem;
                width: 1.72rem;
                font-size: .24rem;
                margin-top: .08rem;
                line-height: 1.5;
            }
        }
    }
}
</style>
