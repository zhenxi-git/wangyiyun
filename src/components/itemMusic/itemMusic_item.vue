<template>
    <div class="item-music">
        <div class="item">
            <div class="left_box" @click="changeMusic">
                <div class="left">{{ index }}</div>
                <div class="center">
                    <div class="top1">{{name}}</div>
                    <div class="bottom">{{ author }}</div>
                </div>
            </div>

            <div class="right">
                <svg class="icon" aria-hidden="true" v-if="mv" style="margin-right:0.1rem ;"  @click="openMvDetail">
                    <use xlink:href="#icon-bofangliang"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-daohang"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps} from "vue"
import { useStore } from "vuex"
import {useRouter} from 'vue-router'
import { Toast } from 'vant';
const router =useRouter()
const store = useStore()
const props = defineProps({
    index: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        default: ""
    },
    mv: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: ''
    },
    itemList:{
        type:Array,
        default:()=>{[]}
    },
    fee:{
        type:Number,
        default:0
    }
})
console.log("+++++++",props.fee)
const changeMusic =async () => {
store.commit("setPlayList",props.itemList)
if(props.fee==1){
    Toast('VIP 歌曲暂不支持播放');
}else if(props.fee==4){
    Toast('付费歌曲暂不支持播放');

}else if(props.fee==0||props.fee==8){
    store.commit('changeMusic', props.index - 1) //调用vux里的方法
}
 
}
const openMvDetail=()=>{
        router.push({
        path: "/videoDetail",
        query:{id:props.mv}
    })
}
</script>
<style lang="less" scoped>
.item-music {
    width: 100%;

    .item {
        width: 100%;
        height: 1.3rem;
        // background-color: aqua;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rem .2rem;

        .left_box {
            display: flex;
            align-items: center;
            justify-content: center;

            .left {
                margin-right: .2rem;
                width: .4rem;
                // background-color: aqua;
            }

            .center {
                width: 5.3rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;


                .top1 {
                    width: 100%;
                    height: 50%;
                    font-weight: 600;
                    text-align: left;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;

                }

                .bottom {
                    width: 100%;
                    height: 50%;
                    font-size: .24rem;
                    color: #000;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

        }

        .right {
            width: 1rem;
            display: flex;
            justify-content: flex-end;

            // background-color: aqua;
            .icon {}
        }
    }
}
</style>
