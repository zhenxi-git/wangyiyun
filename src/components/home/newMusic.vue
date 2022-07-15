<template>
    <div class="newMusic">
        <div class="title">
            <div class="left">
                最新音乐
            </div>
            <div class="right">
                查看更多
                <Icon name="arrow"></Icon>
            </div>
        </div>
        <div class="swiper_box">
            <itemMusic v-for="(item, index) in newMusicList.list" :index="index + 1" :key="index" :mv="item.song.mvid"
                :name="item.name" :itemList="newMusicList.list" :fee="item.fee" :author="authorList(item.song.artists)"></itemMusic>
        </div>

    </div>
</template>
<script setup>
import { newSong } from "../../api/home.js"
import { onMounted, reactive } from "vue"
import { Icon } from 'vant';
import itemMusic from "../itemMusic/itemMusic_item";
// import { useStore } from 'vuex'
// const store = useStore()
const newMusicList = reactive({
    list: []
})
onMounted(() => {
    getMusic()
})
const getMusic = async () => {
    const res = await newSong({
        limit: 20
    })
    console.log("新歌曲", res)
    newMusicList.list = res.data.result
    newMusicList.list.forEach(item => {//更改一下对象的字段
        item.al = item.song.album
        item.ar = item.song.artists
    })

    console.log("修改后的新歌", newMusicList.list)
}

const authorList = (arr) => {  //拿到歌曲的作者
    console.log(arr)
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
</script>
<style lang="less" scoped>
.newMusic {
    width: 100%;
    margin: 0 auto;
    margin-top: .2rem;
    // box-shadow: 0 .08rem .16rem 0.02rem rgba(0, 0, 0, 0.2), 0 .12rem .8rem 0 rgba(0, 0, 0, 0.19);
    border-radius: .2rem;
    padding-top: .3rem;
    background-color: #fff;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            font-size: .38rem;
            font-weight: 600;
            margin-left: .3rem;
        }

        .right {
            display: flex;
            align-items: center;
            justify-content: center;
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
        height: 5.4rem;
        margin-top: .2rem;
        overflow: hidden;

    }
}
</style>
