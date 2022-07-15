<template>
    <div class="mvDetail">
        <img :src="mvDetail.cover" alt="" class="bgImg">
        <div class="login_top" :style="'background-image:url(' + mvDetail.cover + ')'">
            <svg class="icon" aria-hidden="true" @click="blackPage">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <div class="title">
                MV
            </div>
        </div>
        <div class="Introduction">
            <div class="name">
                <text>MV</text>
                {{ mvDetail.name }}
            </div>
            <div style="text-align:left;">MV简介：</div>
            <div class="IntroductionDetail">
                <div class="time">发布时间：{{ mvDetail.publishTime }}</div>
                <div class="num">播放次数：{{ mvDetail.playCount }}次</div>
                <div class="content">
                    简介：{{ mvDetail.desc ? mvDetail.desc : '暂无简介' }} </div>
            </div>
        </div>
        <div class="void">
            <video :src="url" ref="video" controls autoplay width="330" class="video-play"></video>
        </div>
        <div class="similar">
            <Swipe :loop="false" :width="180" class="my_Swipe" :show-indicators="false">
                <SwipeItem v-for="(item, index) in msList" :key="index" @click="similarDetail(item.id)">
                    <div class="mvItem">
                        <img :src="item.cover" alt="">
                        <div class="name">{{ item.name }}</div>
                        <div class="ar">{{ authorList(item.artists) }}</div>
                    </div>
                </SwipeItem>

            </Swipe>

        </div>
        <div class="comments">
            <div class="tele">
                评论区
                <div class="tarList">
                    <div class="tar" v-for="(item, index) in tarBar" :key="index" :class="{ active: index == current }"
                        @click="changeComment(index + 1)">{{ item }}</div>

                </div>
            </div>
            <Loading vertical v-if="!comments.length" color="#0094ff">加载中...</Loading>
            <comment v-for="(item, index) in comments" :key="index" :comments="item" :type="1"></comment>
        </div>
        <div class="sendComments">
            发送评论
        </div>
    </div>
</template>
<script setup>
import { defineEmits, defineProps, ref} from 'vue'
import { Swipe, SwipeItem,Loading} from 'vant';
import comment from './comment.vue';
const emit = defineEmits(['closeDetail', 'goDetail','getComment'])
const tarBar = ref(['按推荐排序', '按热度排序'])
const current = ref(0)
const video=ref(null)
const props= defineProps({
    mvDetail: {
        type: Object,
        default: () => { return {} }
    },
    msList: {
        type: Array,
        default: () => { [] }
    },
    url: {
        type: String,
        default: ''
    },
    comments: {
        type: Array, //评论
        default: () => { [] }
    }
})
const similarDetail = (id) => {
    emit('goDetail', id)
}
// //切换评论
const changeComment = (index) => {
    console.log(props.mvDetail.id)
    current.value = index - 1
    emit('getComment',props.mvDetail.id,index)
}
const authorList = (arr) => {  //拿到歌曲的作者
    let str = ''
    str = arr.reduce((preValue, curValue) => {
        if (arr.length > 1) {
            let str1 = preValue + curValue.name + '，'
            return str1
        } else {
            return preValue + curValue.name + '，'
        }


    }, str)

    return str.slice(0, str.length - 1)
}
const blackPage=()=>{
    emit('closeDetail')
    video.value.pause()
}
</script>

<style lang="less" scoped>
.mvDetail {
    width: 100%;
    padding-top: 1rem;
    height: 100vh;
    // overflow-y: scroll;
    overflow-x: hidden;
    color: #fff;

    .bgImg {
        width: 100%;
        height: 100vh;
        filter: blur(15px);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }

    .login_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 1rem;
        position: fixed;
        top: 0rem;
        left: 0rem;
        right: 0rem;
        // background-color: #fff;
        // background-size: 100% 100%;
        z-index: 99;
        border-bottom: 1px solid #eee;

        .icon {
            width: 0.4rem;
            height: 0.4rem;
            margin-left: .2rem;
            position: relative;
            z-index: 5;
        }

        .title {
            flex: 1;
            font-size: .4rem;
            font-weight: 600;
            margin-left: -0.5rem;
        }
    }

    .Introduction {
        width: 100%;
        height: 2.5rem;
        // background-color: aqua;
        padding-left: .5rem;
        margin-top: .12rem;

        .name {
            font-size: .40rem;
            font-weight: 600;
            text-align: left;
            display: flex;
            align-items: center;

            text {
                display: inline-block;
                border: .02rem solid #e83c3c;
                border-radius: .06rem;
                font-size: .25rem;
                font-weight: 300;
                align-items: center;
                justify-content: center;
                position: relative;
                color: #e83c3c;
                padding: .08rem;
                margin-right: .3rem;
            }
        }

        .title {
            margin-top: .08rem;
        }

        .num {
            margin-bottom: .1rem;
        }

        .IntroductionDetail {
            font-size: .24rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;

            .content {
                width: 98%;
                height: 1rem;
                overflow: scroll;
                line-height: 1.5;
                text-align: left;

            }
        }

    }

    .void {
        width: 100%;
        // height: 3.6rem;
        margin-top: .6rem;

    }

    .similar {
        width: 100%;
        height: 2.8rem;
        // background-color: #ee5;
        margin-top: .4rem;

        .my_Swipe {
            width: 100%;

            .mvItem {
                width: 3rem;
                height: 2.8rem;
                // background-color: #e83c3c;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: .2rem;

                img {
                    width: 3rem;
                    height: 1.6rem;
                }

                .name {
                    width: 100%;
                    font-size: .3rem;
                    font-size: 600;
                    text-align: left;
                    height: .4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .ar {
                    width: 100%;
                    font-size: .3rem;
                    color: rgb(184, 183, 183);
                    text-align: left;
                    height: .4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                }
            }
        }


    }

    .comments {
        width: 100%;

        .tele {
            width: 100%;
            color: #fff;
            text-align: left;
            font-weight: 600;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            margin-bottom: .3rem;
            display: flex;
            justify-content: space-between;
            padding: 0rem .4rem;
        }

        .tarList {
            display: flex;
            justify-content: space-around;
            font-size: .2rem;
            width: 3rem;
            .tar {
                color: #999;
            }

            .active {
                color: #fff;
            }
        }


    }

    .sendComments {
        width: 100%;
        height: 10rem;

    }
}
</style>
