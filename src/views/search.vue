<template>
    <div class="Search_box">
        <div class="top">
            <div class="Search_top">
                <svg class="icon" aria-hidden="true" @click="router.go(-1)">
                    <use xlink:href="#icon-fanhui"></use>
                </svg>
                <Search v-model="keyWord" placeholder="请输入搜索关键词" class="search" @search="onSearch" />
            </div>
            <div class="search_history" v-if="!music.list.length && !isShowTar">
                <div class="history">历史:</div>
                <div v-for="(item, index) in history.keyList" :key="index" @click="historySearch(item)" class="keyName">
                    {{ item }}</div>
                <svg class="icon" aria-hidden="true" v-if="history.keyList.length && !music.list.length"
                    @click="deleteHistory">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
            </div>
        </div>

        <div class="searchList">
            <Tabs v-model:active="active" sticky offset-top="1rem" v-if="isShowTar" @change="cutTab">
                <Loading size="24px" v-if="isLoad">加载中...</Loading>
                <tab title="单曲">
                    <div class="item" v-for="(item, index) in music.list" :key="index" @click="playMu(item)">
                        <div class="left_box" @click="changeMusic">
                            <div class="left">{{ index }}</div>
                            <div class="center">
                                <div class="top1">{{ item.name }}</div>
                                <div class="bottom">{{ authorList(item.artists) }}</div>
                            </div>
                        </div>

                        <div class="right">
                            <svg class="icon" aria-hidden="true" v-if="item.mvid" style="margin-right:0.1rem ;">
                                <use xlink:href="#icon-bofangliang"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-daohang"></use>
                            </svg>
                        </div>
                    </div>
                </tab>
                <tab title="歌单">
                    <div class="songList" v-for="(item, index) in music.list" :key="index"
                        @click="gosongListDetail(item.id)">
                        <div class="left">
                            <img :src="item.coverImgUrl" alt="">
                        </div>
                        <div class="right">
                            <div class="name">{{ item.name }}</div>
                            <div class="bottom">{{ item.trackCount }}首，by {{
                                    item.creator ? item.creator.nickname : nickname
                            }}
                                ，播放{{ changeNum(item.playCount) }}次</div>
                        </div>
                    </div>
                </tab>
                <tab title="视频">
                    <div class="video_item" v-for="(item, index) in music.list" :key="index"
                        @click="goVideoDetail(item.id)">
                        <div class="left">
                            <img :src="item.cover" alt="">
                            <div class="time">{{ changeTime(item.duration) }}</div>
                        </div>
                        <div class="right">
                            <div class="name">{{ item.name }}</div>
                            <div class="ar">{{ authorList(item.artists) }}</div>
                            <div class="num">{{ changeNum(item.playCount) }}次播放</div>
                        </div>
                    </div>
                </tab>
                <tab title="歌手">
                    <div class="singer" v-for="(item, index) in music.list" :key="index"
                        @click="goSingerDetail(item.id)">
                        <div class="left">
                            <img :src="item.picUrl" alt="">
                            <div class="name">{{ item.name }}</div>
                        </div>
                        <div class="button noFollow" v-if="item.followed">已关注</div>
                        <div class="button" v-else>+ 关注</div>
                    </div>
                </tab>
            </Tabs>
        </div>
    </div>
</template>
<script setup>
import { Search, Tab, Tabs, Loading } from 'vant';
import { ref, onMounted, reactive, watch } from 'vue'
import { useRouter } from "vue-router"
import { musicSearch } from '../api/search'
import { useStore } from "vuex"
import { Toast } from 'vant';
const router = useRouter()
const store = useStore()
const keyWord = ref('')
const isShowTar = ref(false)
const history = reactive({
    keyList: []
})
const type = ref(1)
const music = reactive({
    list: []
})
const nickname = ref('')
const active = ref(0)
const isLoad = ref(false)
const onSearch = () => {
    isLoad.value = true
    console.log(keyWord.value)
    if (keyWord.value == '') return
    history.keyList.unshift(keyWord.value) //unshift添加到数组的最前面
    if (history.keyList.length >= 6) { //限制搜索历史的长度
        history.keyList.pop() //pop删除数组的最后一个元素，返回被删除的元素，改变原数组
    }
    history.keyList = [...new Set(history.keyList)] //set不会添加重复的值，返回一个类数组，可以用Array.from(new Set(arr))转成一个数据，常用来数组去重
    localStorage.setItem("keyWork", JSON.stringify(history.keyList)) //先转成字符串然后保存到缓存里
    searchMusic()

}
onMounted(() => {
    history.keyList = JSON.parse(localStorage.getItem("keyWork")) || []  //从缓存里取数据，然后在转成数组，如果缓存里没有就赋值为空，不然保错
    console.log("缓存", history.keyList)
})
//删除历史记录
const deleteHistory = () => {
    localStorage.removeItem("keyWork")
    history.keyList = []
}
//搜索歌曲
const searchMusic = async (type = 1) => {
    isShowTar.value = true
    const res = await musicSearch({
        keywords: keyWord.value,
        type: type
    })
    if (type == 1) {
        music.list = res.data.result.songs
    }
    if (type == 1000) {
        music.list = res.data.result.playlists
    }
    if (type == 1004) {
        music.list = res.data.result.mvs

    }
    if (type == 100) {
        music.list = res.data.result.artists

    }
    isLoad.value = false
    console.log(res)
}
const changeTime = (time) => {
    if (time) {
        if ((time / 1000) > 60) {
            let min = Math.floor((time / 1000) / 60)
            let sec = (time / 1000) % 60
            return (min > 10 ? min : '0' + min) + ":" + (sec > 10 ? Math.floor(sec) : '0' + Math.floor(sec))
        }
    }

}
//跳转歌单详情
const gosongListDetail = (id) => {
    router.push({
        path: '/itemMusic',
        query: {
            id: id
        }
    })
}
//跳转视频详情
const goVideoDetail = (id) => {
    router.push({
        path: "/videoDetail",
        query: { id: id }
    })
}
//跳转歌手详情页
const goSingerDetail = (id) => {
    router.push({
        path: '/singerDetail',
        query: {
            id: id
        }
    })
}
const changeNum = (element) => { //处理播放量
    if (element) {
        if (element >= 100000000) {
            return (element / 100000000).toFixed(2) + "亿"
        } else if (element >= 10000) {
            return (element / 10000).toFixed(2) + "万"
        } else {
            return element
        }
    }
}
//点击历史记录搜索
const historySearch = (key) => {
    keyWord.value = key
    isLoad.value = true
    searchMusic()
}
const authorList = (arr) => {  //拿到歌曲的作者
    if (arr) {
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

}
//切换tar
const cutTab = (e) => {
    switch (e) {
        case 0:
            type.value = 1
            break;
        case 1:
            type.value = 1000
            break;
        case 2:
            type.value = 1004

            break;
        case 3:
            type.value = 100
            break;
    }
    isLoad.value = true
    searchMusic(type.value)
}
watch(keyWord, () => { //监听搜索关键字是否为空
    if (keyWord.value == '') {
        music.list = []
        isShowTar.value = false
    }
})
//播放歌曲
const playMu = (item) => {
    item.al = item.album  //更改一下对象的字段
    item.al.picUrl = item.album.artist.img1v1Url
    item.ar = item.artists
    console.log(item)
    if (item.fee == 1) {
        Toast('VIP 歌曲暂不支持播放');
    } else if (item.fee == 4) {
        Toast('付费歌曲暂不支持播放');

    } else if (item.fee == 0 || item.fee == 8) {
        store.commit("addMusic", item)
        store.commit("changeMusic", store.getters.getPlayList.length - 1)
    }

}
</script>
<style lang="less" scoped>
.Search_box {
    width: 100%;
    position: relative;
    padding-top: 1rem;

    .top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        .Search_top {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 1rem;

            .icon {
                width: 0.4rem;
                height: 0.4rem;
                margin-left: .2rem;
            }

            .search {
                flex: 1;
            }
        }

        .search_history {
            display: flex;
            padding: .2rem;
            align-items: flex-start;
            flex-wrap: wrap;
            width: 100%;
            height: 2rem;
            // border: 1px solid #000;
            position: relative;

            .history {
                font-size: .31rem;
                font-weight: 600;
            }

            .keyName {
                height: .6rem;
                // background-color:rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(0, 0, 0, 0.3);
                border-radius: .3rem;
                padding: 0rem .2rem;
                line-height: .6rem;
                color: #000;
                margin: 0 .2rem;
            }

            .icon {
                position: absolute;
                right: 0.2rem;
                top: 1.1rem;
            }
        }

    }

    .searchList {
        height: calc(100vh - 1.5rem);
        width: 100%;
        overflow-y: scroll;

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

        .songList {
            display: flex;
            padding: 0rem .4rem;
            width: 100%;
            height: 1rem;
            margin: .2rem 0rem;

            .left {
                width: 1.5rem;
                height: 1rem;

                img {
                    width: 1rem;
                }
            }

            .right {
                text-align: left;
                flex: 1;

                .name {
                    width: 5rem;
                    height: .6rem;
                    font-size: .36rem;
                    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                }

                .bottom {
                    height: .4rem;
                    width: 5rem;
                    font-size: .24rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

        }

        .video_item {
            display: flex;
            padding: 0rem .4rem;
            margin: .2rem 0rem;

            .left {
                position: relative;

                img {
                    width: 3rem;
                    height: 1.68rem;
                    border-radius: .1rem;
                }

                .time {
                    position: absolute;
                    bottom: .2rem;
                    right: .2rem;
                    color: #fff;
                }
            }

            .right {
                margin-left: .2rem;
                text-align: left;

                .name {
                    font-size: .35rem;
                    width: 3.5rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                .ar {
                    font-size: .24rem;
                    color: #999;
                }

                .num {
                    font-size: .24rem;
                    color: #999;
                }
            }
        }

        .singer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0rem .5rem;
            margin: .3rem 0rem;

            .left {
                display: flex;
                align-items: center;

                img {
                    width: 1.1rem;
                    height: 1.1rem;
                    border-radius: 50%;
                }

                .name {
                    width: 3rem;
                    margin-left: .46rem;
                    text-align: left;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }

            .name {
                font-size: .36rem;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

            }

            .button {
                display: flex;
                align-items: center;
                height: .6rem;
                color: rgb(240, 75, 75);
                border-radius: .3rem;
                padding: 0rem .4rem;
                border: .02rem solid rgb(240, 75, 75);
            }

            .noFollow {
                color: #666;
                border: .02rem solid #666;
            }
        }
    }

}
</style>
