<template>
    <div class="mv_box_item" :id="iSHorizontally ? 'horizontally' : ''">
        <div class="img_box">
            <img :src="mvItem.cover" alt="" >
            <div class="playNum">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofangliang"></use>
                </svg>
                <div class="num">{{ changeNum(mvItem.playCount) }}</div>
            </div>
        </div>
        <div class="text_box">
            <div class="name">{{ mvItem.name }}</div>
            <div class="ar">{{ mvItem.artistName }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
    mvItem: {
        type: Object,
        default: () => { }
    },
    iSHorizontally: {
        type: Boolean,
        default: false
    }
})
const changeNum = (element) => { //处理播放量
    if (element >= 100000000) {
        return (element / 100000000).toFixed(2) + "亿"
    } else if (element >= 10000) {
        return (element / 10000).toFixed(2) + "万"
    }
}
</script>
<style lang="less" scoped>
.mv_box_item {
    width: 3.5rem;
    // background-color: aqua;
    .img_box {
        width: 3.5rem;
        height: 2.5rem;
        position: relative;
        // background-color: aliceblue;

        img {
            width: 3.5rem;
            height: 2.5rem;
        }

        .playNum {
            display: flex;
            position: absolute;
            top: 0.05rem;
            right: 0.05rem;
            background-color: rgba(0, 0, 0, .1);
            border-radius: .1rem;

            .num {
                font-size: .22rem;
                color: #fff;
            }

            .icon {
                width: .3rem;
                height: .3rem;
                fill: #fff;
            }
        }
    }

    .text_box {
        display: flex;
        flex-direction: column;
        width: 100%;
        .name {
            flex: 3;
            font-size: .32rem;
            text-align: left;
        }

        .ar {
            flex: 1;
            font-size: 14px;
            color: rgb(184, 182, 182);
            text-align: left;
        }
    }


}

#horizontally {
    width: 90%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
     background-color: #f0f0f0;
     border-radius: .15rem;
     margin-top: .3rem;
     padding-left: 0.2rem;
    .img_box {
        width: 3rem;
        height: 2.3rem;
        position: relative;
        // background-color: aliceblue;
        border-radius: .2rem;
        overflow: hidden;
        img {
            width: 3rem;
            height: 2.3rem;
        }

        .playNum {
            display: flex;
            position: absolute;
            top: 0.05rem;
            right: rem;
            background-color: rgba(0, 0, 0, .1);
            border-radius: .1rem;

            .num {
                font-size: .22rem;
                color: #fff;
            }

            .icon {
                width: .3rem;
                height: .3rem;
                fill: #fff;
            }
        }
    }

    .text_box {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        height:2.3rem;
        flex: 1;
        margin-left: .3rem;
       
        .name {
            font-size: .35rem;
            text-align: left;
            font-weight: 600;
        }

        .ar {
            font-size: 14px;
            color: rgb(184, 182, 182);
            text-align: left;
            margin-top: .2rem;
        }
    }


}
</style>
