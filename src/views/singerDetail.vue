<template>
    <div class="singerDetail">
        <div class="login_top">
            <svg class="icon" aria-hidden="true" @click="router.go(-1)">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <div class="title">
                歌手详情
            </div>
        </div>
        <div class="img_box">
            <img :src="singerData.artist.cover" alt="">
        </div>
        <div class="name_box">
            <div class="name">{{ singerData.artist.name }}</div>
            <div class="fans">
                <div class="follow">{{ singerData.fans.followCnt }}关注</div>
                <div class="fansCount">{{ changeNum(singerData.fans.fansCnt) }}粉丝</div>
            </div>
            <div class="tag">{{ singerData.identify.imageDesc }}</div>
            <div class="focus">+ 关注</div>
        </div>
        <div class="tar">
            <Tabs v-model:active="active" swipeable background="#f0f0f0" offset-top="0rem" sticky @change="changeIndex">
                <Tab :title="'主页'">
                    <div class="wikipedia">
                        <div class="title">基本简介</div>
                        <div class="desc">{{ singerData.desc.briefDesc }}</div>
                    </div>
                    <div class="wikipedia" v-for="(item, index) in singerData.desc.introduction" :key="index">
                        <div class="title">{{ item.ti }}</div>
                        <div class="desc">{{ item.txt }}</div>
                    </div>
                </Tab>
                <Tab :title="'歌曲'" :badge="singerData.song.length" :show-zero-badge="false">
                    <div class="music">
                        <div class="title" v-if="singerData.song.length">热门50首</div>
                        <itemMusic v-for="(item, index) in singerData.song" :author="authorList(item.ar)" :mv="item.mv"
                            :key="index" :index="index + 1" :fee="item.fee" :name="item.name" :itemList="singerData.song"></itemMusic>
                    </div>
                </Tab>
                <Tab :title="'专辑'" :badge="singerData.Album.length" :show-zero-badge="false">
                    <div class="albumList">
                        <div class="album_item" v-for="(item, index) in singerData.Album" :key="index"
                            @click="openMuDetail(item.id)">
                            <div class="left">
                                <img :src="item.picUrl" alt="">
                            </div>
                            <div class="right">
                                <div class="name">{{ item.name }}</div>
                                <div class="time">{{ moment(item.publishTime).format('YYYY-MM-DD') }} {{ item.size }}首
                                </div>
                            </div>
                        </div>


                    </div>

                </Tab>
                <Tab :title="'视频'" :badge="singerData.mv.length" :show-zero-badge="false">
                    <div class="mv_box">
                        <div class="mv_item" v-for="(item, index) in singerData.mv" :key="index"
                            @click="goMvDetail(item.id)">
                            <div class="left">
                                <img :src="item.imgurl" alt="">
                            </div>
                            <div class="right">
                                <div class="name">{{ item.name }}</div>
                                <div class="time">{{ item.publishTime }}</div>
                                <div class="num">{{ changeNum(item.playCount) }}播放</div>
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
        <!-- 专辑详情 -->
        <Popup v-model:show="isShow" position="bottom" :style="{ height: '100%', width: '100%' }">
            <div>
                <itemMusic_top  :playlist="playlists.playDetails" :isBack="false" @openPopup="openPopup"
                    @colsePopup="colsePopup"></itemMusic_top>
                <itemMusic_bottom :id="musicId" :subscribedCount="playlists.playDetails.subscribedCount">
                </itemMusic_bottom>
                <Popup v-model:show="isTrue" position="bottom" :style="{ height: '100%', width: '100%' }">
                    <div class="box">
                        <div class="top">
                            <svg class="icon" aria-hidden="true" @click="closePoupr">
                                <use xlink:href="#icon-fanhui1"></use>
                            </svg>
                            <div class="text_0">
                                评论
                                <!-- ({{ replyComment.length }}) -->
                            </div>
                        </div>
                        <comment :comments="item" v-for="(item, index) in playlists.comment" :type="type" :key="index">
                        </comment>
                    </div>
                </Popup>
            </div>
        </Popup>
        <!-- 视频详情 -->
        <Popup v-model:show="isShowMv" position="bottom" :style="{ height: '100%', width: '100%' }">
            <mvDetails @closeDetail="closeDetail" @goDetail="goDetail" :msList="music.msList" :mvDetail="music.mvDetail"
                :url="url" @getComment="getComment"  :comments="music.comment"></mvDetails>
        </Popup>
    </div>

</template>
<script setup>
import { SingerDetail, SingerDesc, SingerFansCount, SingerSong, SingerAlbum, SingerMv } from '../api/singer'
import { musicDetail } from '../api/home.js'
import { mvComment, mvDetail, mvUrl, mvSong, } from '../api/mv.js'
import { onMounted, reactive, ref, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tab, Tabs, Popup } from 'vant';
import itemMusic from '../components/itemMusic/itemMusic_item.vue';
import itemMusic_top from '../components/itemMusic/itemMusic_top.vue'
import itemMusic_bottom from "../components/itemMusic/itemMusic_bottom.vue"
import comment from "../components/mv/comment.vue"
import mvDetails from '../components/mv/mvDetail.vue'
import moment from 'moment';
const type = ref(null) // 评论类型
const route = useRoute()
const router = useRouter()
const isTrue = ref(false)
const isShowMv = ref(false)
const isShow = ref(false)
const id = route.query.id
const musicId = ref(null)
const active = ref(0)
const url = ref('')
const singerData = reactive({
    artist: {}, //歌手详情
    desc: {},//歌手描述
    fans: {}, //歌手粉丝
    identify: {},//歌手标签
    song: [], //热门50首
    Album: [],//专辑
    mv: [],
})
//mv
const music = reactive({
    msList: [],
    mvDetail: [],
    comment: []
})
provide('mvId', musicId)
//专辑详情
let playlists = reactive({
    playDetails: {},
    comment: []
})
onMounted(() => {
    gteSingerDetail()
    gteSingerDesc()
    getSingerFansCount()

})
//相似视频详情
const goDetail = (id) => {
    musicId.value = id
    getMvDetail(id)
    getUrl(id)
    gteSong(id)
    getComment(id, 1)
}
//打开MV详情
const goMvDetail = (id) => {
    musicId.value = id
    isShowMv.value = true
    getMvDetail(id)
    getUrl(id)
    gteSong(id)
    getComment(id, 1)
}
//关闭视频详情
const closeDetail = () => {
    isShowMv.value = false
}
//mv详情
const getMvDetail = async (id) => {
    const res = await mvDetail({
        mvid: id
    })
    music.mvDetail = res.data.data
    console.log("mv详情", res)
}
//mv播放地址
const getUrl = async (id) => {
    const res1 = await mvUrl({
        id: id

    })
    url.value = res1.data.data.url
    console.log("url", res1)
}
//相似mv
const gteSong = async (id) => {
    const res2 = await mvSong({
        mvid: id
    })
    console.log("相似mv", res2)
    music.msList = res2.data.mvs
}

//获取歌手详情
const gteSingerDetail = async () => {
    const res = await SingerDetail({
        id: id
    })
    console.log("歌手详情", res)
    singerData.artist = res.data.data.artist
    if (res.data.data.identify) {
        singerData.identify = res.data.data.identify
    } else {

        if (res.data.data.artist.identities.length == 0) {
            singerData.identify = ''
        } else {
            let str = ''
            res.data.data.artist.identities.forEach(item => {
                str = item + str + ','
            })
            singerData.identify = str.split(0, str.length - 1)
        }


    }

}
//关闭评论
const closePoupr = () => {
    isTrue.value = false
}
//获取描述
const gteSingerDesc = async () => {
    const res = await SingerDesc({
        id: id
    })
    console.log("歌手描述", res)
    singerData.desc = res.data
}
//获取粉丝数量
const getSingerFansCount = async () => {
    const res = await SingerFansCount({
        id: id
    })
    console.log("粉丝数量", res)
    singerData.fans = res.data.data
}
const changeNum = (element) => { //处理数字
    if (element >= 100000000) {
        return (element / 100000000).toFixed(2) + "亿"
    } else if (element >= 10000) {
        return (element / 10000).toFixed(2) + "万"
    } else {
        return element
    }
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
//获取热门50首
const getSingerSong = async () => {
    const res = await SingerSong({
        id: id
    })
    console.log("热门50首", res)
    singerData.song = res.data.songs
}
//获取专辑
const getSingerAlbum = async () => {
    const res = await SingerAlbum({
        id: id
    })
    console.log("专辑", res)
    singerData.Album = res.data.hotAlbums
}
//打开专辑详情
const openMuDetail = (id) => {
    musicId.value = id
    isShow.value = true
    getMusicDetail(id)
}
//专辑详情接口
const getMusicDetail = async (id) => {
    const res = await musicDetail({
        id: id
    })
    playlists.playDetails = res.data.playlist
    console.log("详情", playlists.playDetails)
}
//获取歌手mv
const getSingerMv = async () => {
    const res = await SingerMv({
        id: id,
        size: 30
    })
    console.log("歌手mv", res)
    singerData.mv = res.data.mvs
}
//获取专辑评论和视频评论
const getComment = async (id, types, sortType = 1) => {
    playlists.comment = []
    const res = await mvComment({
        id: id,
        pageNo: 1,
        pageSize: 66,
        type: types,
        sortType: sortType
    })
    if (types == 1) {
        music.comment = res.data.data.comments
    }
    playlists.comment = res.data.data.comments

    type.value = types
    console.log("评论", res)

}
//关闭详情
const colsePopup = () => {
    isShow.value = false
}
//打开专辑评论
const openPopup = () => {
    isTrue.value = true
    getComment(playlists.playDetails.id, 3)
}
const changeIndex = (e) => {
    switch (e) {
        case 0:
            if (!singerData.desc.length) {
                gteSingerDesc()
            }
            break;
        case 1:
            if (!singerData.song.length) {
                getSingerSong()

            }
            break;
        case 2:
            if (!singerData.Album.length) {
                getSingerAlbum()
            }
            break;
        case 3:
            if (!singerData.mv.length) {
                getSingerMv()
            }

            break;
    }
}
</script>
<style lang="less">
.singerDetail {
    width: 100%;
    padding-top: 1rem;
    background-color: #f0f0f0;
    position: relative;
    padding-bottom: 1.2rem;

    .box {
        width: 100%;
        height: 100%;
        padding-top: 1rem;

        .top {
            width: 100%;
            height: 1rem;
            background-color: #fff;
            display: flex;
            align-items: center;
            position: fixed;
            top: 0rem;
            border-radius: .3rem;

            .icon {
                margin-left: .5rem;
            }

            .text_0 {
                margin-left: 0.4rem;
            }
        }
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
        background-color: #fff;
        z-index: 99;

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

    .img_box {
        width: 100%;
        height: 6rem;

        img {
            width: 100%;
            height: 6rem;
        }
    }

    .name_box {
        width: 90%;
        min-height: 2rem;
        background-color: #fff;
        margin: 0 auto;
        border-radius: .3rem;
        position: absolute;
        top: 6rem;
        left: 50%;
        transform: translateX(-50%);
        padding-top: .3rem;
        padding-bottom: 0.3rem;

        .name {
            font-size: .38rem;
            font-weight: 600;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

        .tag {
            margin-top: .08rem;
            font-size: .26rem;
            color: #999;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

        }

        .fans {
            display: flex;
            justify-content: center;
            font-size: .26rem;
            color: #999;

            .follow::after {
                content: '';
                display: inline-block;
                width: .02rem;
                height: .2rem;
                background-color: #999;
                margin: 0rem .1rem;
            }

        }

        .focus {
            height: .55rem;
            width: 1.5rem;
            background-color: rgb(245, 80, 80);
            border-radius: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-weight: 600;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            margin: 0 auto;
            margin-top: .1rem;

        }
    }

    .tar {
        width: 100%;
        height: 100%;
        margin-top: 1.6rem;

        .wikipedia {
            width: 90%;
            background-color: #fff;
            min-height: 2rem;
            border-radius: .3rem;
            margin: 0 auto;
            margin-top: .4rem;
            padding-top: .4rem;
            padding-left: .3rem;
            padding-right: .3rem;
            padding-bottom: .2rem;

            .title {
                font-size: .36rem;
                font-weight: 600;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                text-align: left;
            }

            .desc {
                font-size: .3rem;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                color: #2c3e50;
                ;
                text-align: left;
            }
        }

        .music {
            background-color: #fff;
            margin-top: .2rem;
            padding-top: .4rem;
            border-radius: .1rem;

            .title {
                font-size: .36rem;
                font-weight: 600;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                text-align: center;
                margin-left: .4rem;
            }
        }

        .albumList {
            width: 100%;
            margin-top: 0.2rem;
            min-height: 2rem;
            background-color: #fff;

            .album_item {
                width: 100%;
                display: flex;
                align-items: center;
                height: 2rem;

                .left {
                    width: 2rem;

                    img {
                        width: 1.5rem;
                        border-radius: .2rem;
                    }
                }

                .right {
                    flex: 1;
                    text-align: left;

                    .name {
                        color: #2c3e50;
                        font-size: .4rem;
                        font-weight: 400;
                        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                    }

                    .time {
                        font-size: .25rem;
                        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                        color: #999;

                    }
                }
            }
        }

        .mv_box {
            width: 100%;
            padding-top: .2rem;

            .mv_item {
                display: flex;
                width: 100%;
                padding: 0rem .4rem;
                height: 2.2rem;
                align-items: center;

                .left {
                    width: 3rem;
                    height: 2rem;

                    img {
                        width: 3rem;
                        height: 2rem;
                        border-radius: .15rem;
                    }
                }

                .right {
                    flex: 1;
                    text-align: left;
                    margin-left: .2rem;

                    .name {
                        height: 1rem;
                        font-size: 0.35rem;
                        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                        font-weight: 500;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }

                    .time {
                        font-size: .2rem;
                        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                        color: #999;
                    }

                    .num {
                        font-size: .2rem;
                        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                        color: #999;
                    }
                }
            }
        }
    }

}
</style>