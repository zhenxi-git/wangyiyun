<template>
    <div class="itemMusicBottom">
        <div class="top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofangliang"></use>
                </svg>
                播放全部<text>(共{{musicList.music.length}}首)</text>
            </div>
            <div class="right">
                <text>+收藏({{subscribedCount}})</text>
            </div>
        </div>
        <div v-if="musicList.music.length">
            <itemMusic_item v-for="(item, index) in musicList.music" :index="index + 1"
            :author="authorList(item.ar)" :mv="item.mv" :key="index" :al="item.al" :name="item.name" :fee="item.fee"  :itemList="musicList.music" ></itemMusic_item>
        </div>
        <div v-else>接口没有返回</div>
        
    </div>
</template>
<script setup>
import itemMusic_item from './itemMusic_item.vue';
import { musicAll } from "../../api/home.js"
import { reactive, defineProps, onMounted,watch,computed} from 'vue';

const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    subscribedCount:{
        type:Number,
        default:0
    }
})
const albumId=computed(()=>{
    return props.id
})
const musicList = reactive({
    music: [],
})
console.log("***************",props)
onMounted(() => {
    console.log(props)
    getMusicList()
    console.log("loveMe".slice(0,5))
 
})
watch(albumId,()=>{ //如果响应监听props里的属性，就要把props里的属性行变成计算属性
     getMusicList()
})
const getMusicList = async () => {
    const res = await musicAll({
        id: props.id,
        limit: 20
    })
    musicList.music = res.data.songs
    console.log("歌曲", musicList.music)
    
}
const authorList = (arr) => {  //拿到歌曲的作者
    let str = ''
    str = arr.reduce((preValue, curValue) => {
        if (arr.length > 1) {
            let str1 =preValue + curValue.name+ '，' 
            return str1
        } else {
            return preValue + curValue.name +'，'
        }


    }, str)

    return  str.slice(0,str.length-1)
}


</script>
<style lang="less">
.itemMusicBottom {
    width: 100%;
    height:calc(100vh - 5.88rem);
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
    background-color: #fff;
    box-sizing: border-box;
    overflow: scroll;


    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 1rem;
        padding: 0rem .4rem;
        

        .left {
            display: flex;
            align-items: center;
            font-weight: 600;

            .icon {
                margin-right: .16rem;
            }

            text {
                font-weight: 300;
                font-size: .25rem;
            }
        }

        .right {
            min-width: 2rem;
            height: .6rem;
            background-color: red;
            border-radius: .3rem;
            line-height: .6rem;
            color: #fff;
            text-align: left;
            display: flex;
            justify-content: center;
            text{
                font-size: 0.2rem;
                display: inline-block;
            }
        }
    }
}
</style>