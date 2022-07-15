<template>
    <div class="comment_box">
        <div class="left">
            <div class="img_box">
                <img :src="comments.user.avatarUrl" alt="">
            </div>
        </div>
        <div class="conter">
            <div class="nick">
                {{comments.user.nickname }}
            </div>
            <div class="time">{{comments.timeStr }}</div>
            <div class="comment">{{comments.content }}</div>
            <div class="num" v-if="comments.replyCount" @click="goReplay(comments.commentId)">{{ comments.replyCount }}条回复 &gt;</div>
        </div>
        <div class="right">
            <div class="like">{{comments.likedCount }}</div>
            <Icon name="good-job"  v-if="comments.liked"  class="icon"/>
            <Icon name="good-job-o" v-else class="icon"/>
        </div>
    </div>
    <Popup v-model:show="isShow" round position="bottom" :style="{ height: '80%', width: '100%' }">
        <replyComment @closeReplay="closeReplay" :ownerComment="floorComment.ownerComment" :replyComment="floorComment.replyComment"></replyComment>
    </Popup>
</template>
<script setup>
import { defineProps, inject, ref ,reactive} from 'vue'
import replyComment from './replyComment';
import { mvCommentFloor } from '../../api/mv'
import { Popup,Icon} from 'vant'
const isShow = ref(false)
const floorComment=reactive({
    ownerComment:{},
    replyComment:[]
})
const props=defineProps({
    comments:{ //评论数组
        type:Object,
        default:()=>{
            return {}
        }
    },
    type:{
        type:Number,
    }
})

const mvId=inject('mvId') //用来接受provide传来的值
// console.log('mvId',mvId);
const goReplay = (id) => {
    isShow.value = true
    getCommentFloor(id)
}
const closeReplay=()=>{
    isShow.value = false
}
const getCommentFloor =async (parentId) => {
    const res = await mvCommentFloor({
        parentCommentId: parentId,
        type: props.type,
        id:mvId.value
    })
    console.log("本层楼评论",res)
    floorComment.ownerComment=res.data.data.ownerComment
    floorComment.replyComment=res.data.data.comments
}
</script>
<style lang="less" scoped>
.comment_box {
    width: 100%;
    display: flex;
    border-bottom: 0.01rem solid rgba(109, 109, 109, 0.2);
    padding: .3rem 0rem;

    .left {
        width: 1rem;

        .img_box {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 0.7rem;
                height: 0.7rem;
                border-radius: 50%;
            }
        }
    }

    .conter {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: .2rem;

        .nick {
            font-size: .35rem;
            color: #f0f0f0;
        }

        .time {
            font-size: .2rem;
            color: rgb(190, 186, 186);
            margin: .04rem 0rem;
        }

        .comment {
            text-align: left;
            font-size: 0.3rem;
        }

        .num {
            display: flex;
            align-items: center;
            font-size: 0.25rem;
            color: rgb(147, 195, 197);
        }
    }

    .right {
        width: 1rem;
        display: flex;
        .like {
            font-size: .2rem;
            color: #f0f0f0;
        }
        .icon{
            margin-top: -0.06rem;
        }
    }
}

</style>
