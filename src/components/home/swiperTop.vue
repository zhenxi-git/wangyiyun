<template>
    <div class="mySwiper">
        <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <SwipeItem v-for="(item,index) in imgList" :key="index">
                    <img :src="item.pic" alt=""/>
            </SwipeItem>
        </Swipe>
    </div>
</template>
<script setup>
import { Swipe, SwipeItem } from 'vant';
import { ref ,onMounted } from "vue"
import {getBanner} from "../../api/home.js"
onMounted(()=>{
    getImg()
})
const getImg=async()=>{
     const res=await getBanner({
         type:2
     })
     imgList.value=res.data.banners
     console.log(imgList.value)
}
const imgList = ref([])
</script>
<style lang="less">
.mySwiper {
    width: 100%;
    padding-top: 0.1rem;
    background-color: #fff;
    .my-swipe {
        margin: 0 auto;
        margin-top: .4rem;
        width: 96%;
        border-radius: .3rem;

        .van-swipe-item {
            width: 100%;
            height: 2.9rem;
            color: #fff;
            font-size: .4rem;
            text-align: center;
            img{
                width: 100%;
                height: 100%;
            }
        }
         .van-swipe__indicator--active{
        background-color: rgb(185, 238, 62) !important;
    }
    }
   
}
</style>