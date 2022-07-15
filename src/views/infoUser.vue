<template>
    <div class="infoUser_box">
        <div class="bg_box">
            <img :src="user.obj.backgroundUrl" class="bgUrl" />

        </div>
        <div class="megges">
            <div class="avatar_box">
                <img :src="user.obj.avatarUrl" alt="">
            </div>
            <div class="myName">{{ user.obj.nickname }}</div>
            <div class="Account_mg">
                <div class="Focus">{{ user.obj.follows }}关注</div>
                <div class="fans">{{ user.obj.followeds }}粉丝</div>
                <div class="level">Lv.{{ user.obj.level }}</div>
            </div>
        </div>
        <div class="loveMusic">
            <div class="title">我的歌单</div>
            <div class="content_text">
                <div class="item" v-for="(item, index) in user.loveList" :key="index" v-show="!(index==0)" @click="goItemMusic(item.id)">
                    <div class="left">
                        <img :src="item.coverImgUrl" alt="">

                    </div>
                    <div class="right">
                        <div class="name">{{ item.name }}</div>
                        <div class="len">{{ item.trackCount }}首</div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { userList } from "../api/login"
import {useRouter} from 'vue-router'
const router= useRouter()
const store = useStore()
const user = reactive({
    obj: {},
    loveList: []
})
onMounted(() => {
    if (localStorage.getItem("user")) {
        user.obj = JSON.parse(localStorage.getItem('user'))
    } else {
        user.obj = store.getters.getUser
    }
    console.log("用户形象", user.obj)
    getLoveList()
})
const getLoveList = async () => {
    if (localStorage.getItem("userId")) {
        const res = await userList({
            uid: localStorage.getItem("userId")
        })
        console.log("我喜欢的歌曲", res)
        user.loveList = res.data.playlist
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
.infoUser_box {
    position: relative;
    width: 100%;
    box-sizing: border-box;

    .bg_box {
        width: 100%;
        height: 4rem;
        overflow: hidden;
        border-bottom-left-radius: 0.1rem;
        border-bottom-right-radius: .1rem;

        .bgUrl {
            width: 100%;
        }
    }

    .megges {
        width: 7rem;
        height: 2.2rem;
        background: #fff;
        box-shadow: .04rem .04rem .04rem rgba(0, 0, 0, .3);
        border-radius: .3rem;
        margin: 0 auto;
        position: relative;
        top: -.6rem;
        box-sizing: border-box;
        padding-top: .8rem;

        .avatar_box {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top: -.8rem;
            left: 50%;
            transform: translateX(-50%);

            img {
                width: 1.5rem;
                height: 1.5rem;
            }
        }

        .myName {
            font-size: .42rem;
            font-weight: 600;
        }

        .Account_mg {
            width: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin: 0 auto;
            color: #666;

            .Focus::after {
                content: '';
                display: inline-block;
                width: .02rem;
                height: .2rem;
                background-color: rgb(150, 148, 148);
                position: relative;
                left: .2rem;
            }

            .fans::after {
                content: '';
                display: inline-block;
                width: .02rem;
                height: .2rem;
                background-color: rgb(150, 148, 148);
                position: relative;
                left: .2rem;
            }

        }
    }

    .loveMusic {
        width: 94%;
        margin: 0 auto;
        height: 6.1rem;
        display: flex;
        flex-direction: column;
        .title {
            font-size: .5rem;
            font-weight: 600;
            text-align: center;
            height: .6rem;
        }

        .content_text {
            width: 100%;
            background-color: #fff;
            flex: 1;
            overflow: scroll;
            .item {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0rem .4rem;
                height: 1.5rem;

                .left {
                    width: 1rem;
                    height: 1rem;
                    background-color: #666;

                    img {
                        width: 1rem;
                        height: 1rem;
                    }
                }

                .right {
                    margin-left: .3rem;

                    .name {
                        width: 5rem;
                        height: .5rem;
                        font-size: .44rem;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .len {
                        font-size: .3rem;
                        color: #999;
                        text-align: left;
                    }

                }

            }

        }

    }
}
</style>
