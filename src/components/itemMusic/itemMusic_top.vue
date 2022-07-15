<template>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bg">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true" @click="router.go(-1)" v-if="isBack">
                <use xlink:href="#icon-fanhui1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="closePopup" v-else>
                <use xlink:href="#icon-fanhui1"></use>
            </svg>
            <div class="text1">歌单</div>
        </div>
        <div class="topRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-daohang"></use>
            </svg>
        </div>
    </div>
    <div class="itemMusicCenter">
        <div class="top">
            <img :src="playlist.coverImgUrl" alt="" mode="widthFix">
            <div class="right">
                <div class="name">
                    {{playlist.name }}
                </div>
                <div class="author">
                    <img :src="playlist.creator?playlist.creator.avatarUrl:playlist.coverImgUrl" alt="" mode="widthFix">
                    <div class="authorName">
                        {{playlist.creator?playlist.creator.nickname:"未知" }}
                    </div>
                </div>
                <div class="message">
                    {{playlist.description }}
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom_item">
                <svg class="icon" aria-hidden="true" @click="goComment()">
                    <use xlink:href="#icon-pinglun1"></use>
                </svg>
                <div class="num">{{ playlist.commentCount }}</div>
            </div>
            <div class="bottom_item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1"></use>
                </svg>
                <div class="num">{{ playlist.shareCount }}</div>
            </div>
            <div class="bottom_item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <div class="num">下载</div>
            </div>
            <div class="bottom_item">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-show_duoxuan"></use>
                </svg>
                <div class="num">多选</div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { defineProps,onMounted,onUnmounted ,defineEmits} from 'vue'
import { useRouter } from "vue-router"
const router = useRouter()
const props = defineProps({
    playlist: {
        type: Object,
        default: () => { }
    },
    isBack:{
        type:Boolean,
        default:true
    }
})
const emit=defineEmits(['openPopup','colsePopup'])
onUnmounted(()=>{
    sessionStorage.removeItem("itemDetail")
})
onMounted(()=>{
  console.log("详情",props)
})
const goComment=()=>{
    emit('openPopup')
}
const closePopup=()=>{
    emit('colsePopup')
}

</script>
<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: .88rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .bg {
        position: absolute;
        height: 10rem;
        width: 100%;
        z-index: -1;
        filter: blur(10px);
    }

    .topLeft {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
            margin: 0rem .3rem;
            fill: #fff;
        }

        .text1 {
            font-size: .38rem;
            color: #fff;
        }
    }

    .topRight {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .icon {
            margin: 0rem .3rem;
            fill: #fff;
        }
    }
}

.itemMusicCenter {
    width: 100%;
    height: 4rem;

    .top {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;

        img {
            width: 2.5rem;
            border-radius: .2rem;
        }

        .right {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 4rem;

            .name {
                width: 100%;
                height: .4rem;
                color: #fff;
                font-size: .3rem;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .author {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                font-size: .25rem;
                margin: .1rem 0rem;

                img {
                    width: .4rem;
                    border-radius: 50%;
                }

                .authorName {
                    margin-left: 0.3rem;
                    color: #999;
                }
            }

            .message {
                font-size: .2rem;
                text-align: left;
                width: 100%;
                height: 1.6rem;
                // background-color: aqua;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
                overflow: hidden;
                color: #f0f0f0;
            }
        }
    }

    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: -0.2rem;

        .bottom_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .icon {
                // width: 1rem;
                fill: #fff;
            }

            .num {
                font-size: .3rem;
                color: #fff;
                margin-top: .12rem
            }
        }

        .bottom_item {
            .icon {}

            .num {}
        }

        .bottom_item {
            .icon {}

            .num {}
        }

        .bottom_item {
            .icon {}

            .num {}
        }
    }
}
</style>
