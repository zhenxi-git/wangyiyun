<template>
    <div class="replyComment">
        <div class="top1">
            <svg class="icon" aria-hidden="true" @click="closePoupr">
                <use xlink:href="#icon-fanhui1"></use>
            </svg>
            <div class="text_0">
                回复({{replyComment.length}})
            </div>
        </div>
        <div class="owenr">
            <div class="comment_box">
                <div class="left">
                    <div class="img_box">
                        <img :src="ownerComment.user?ownerComment.user.avatarUrl:avatarUrl" alt="">
                    </div>
                </div>
                <div class="conter">
                    <div class="nick">
                        {{ ownerComment.user?ownerComment.user.nickname:nickname }}
                    </div>
                    <div class="time">{{ ownerComment.timeStr }}</div>
                    <div class="comment">{{ ownerComment.content }}</div>
                </div>
                <div class="right">
                    <div class="like">{{ ownerComment.likedCount }}</div>
                     <Icon name="good-job" v-if="ownerComment.liked" size="15" class="icon" />
                    <Icon name="good-job-o" v-else size="15" class="icon"/>
                </div>
            </div>
        </div>
        <div class="replyComment">
                <div class="callComment">全部回复</div>
                <div class="comment_box" v-for="(item,index) in replyComment" :key="index">
                <div class="left">
                    <div class="img_box">
                        <img :src="item.user?item.user.avatarUrl:avatarUrl" alt="">
                    </div>
                </div>
                <div class="conter">
                    <div class="nick">
                        {{ item.user?item.user.nickname:nickname }}
                    </div>
                    <div class="time">{{ item.timeStr }}</div>
                    <div class="comment">{{ item.content }}</div>
                </div>
                <div class="right">
                    <div class="like">{{ item.likedCount }}</div>
                    <Icon name="good-job" v-if="item.liked" size="15" class="icon" />
                    <Icon name="good-job-o" v-else size="15" class="icon"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps,ref,defineEmits} from 'vue'
import { Icon } from 'vant';
const avatarUrl=ref()
const nickname=ref('')
const emit=defineEmits(['closeReplay'])
 defineProps({
    ownerComment: {
        type: Object,
        default: () => { return {} }
    },
    replyComment: {
        type: Array,
        default: () => { [] }
    }
})

const closePoupr=()=>{
    emit('closeReplay')
}

</script>
<style lang="less" scoped>
.replyComment {
    color: #000;
    width: 100%;
    .top1 {
        width: 100%;
        height: 1rem;
        background-color: #fff;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 73%;
        border-radius: .3rem;

        .icon {
            margin-left: .5rem;
        }

        .text_0 {
            margin-left: 0.4rem;
        }
    }

    .owenr {
        width: 100%;
        margin-top: 1rem;
        .comment_box {
            width: 100%;
            display: flex;
            border-bottom: 0.1rem solid rgba(109, 109, 109, 0.1);
            padding-bottom: .3rem;

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
                    font-size: .25rem;
                    color: #666;
                }

                .time {
                    font-size: .15rem;
                    color: #666;
                }

                .comment {
                    text-align: left;
                    font-size: 0.3rem;
                }

                .num {
                    display: flex;
                    align-items: center;
                    font-size: 0.15rem;
                    color: rgb(108, 144, 146);
                }
            }

            .right {
                width: 1rem;

                .like {
                    font-size: .2rem;
                    color: #668;
                }
            }
        }
    }
    .replyComment{
        .callComment{
            width: 100%;
            font-size: .32rem;
            font-weight: 600;
            text-align: left;
            padding-left: .3rem;
            padding-top: .2rem;
        }
        .comment_box {
            width: 100%;
            display: flex;
            border-bottom: 0.01rem solid rgba(109, 109, 109, 0.1);
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
                    font-size: .25rem;
                    color: #666;
                }

                .time {
                    font-size: .15rem;
                    color: #666;
                }

                .comment {
                    text-align: left;
                    font-size: 0.3rem;
                }

                .num {
                    display: flex;
                    align-items: center;
                    font-size: 0.15rem;
                    color: rgb(108, 144, 146);
                }
            }

            .right {
                display: flex;
                width: 1rem;
                .icon{
                    margin-top: -0.08rem;
                }
                .like {
                    font-size: .2rem;
                    color: #668;
                }
            }
        }
    }
}
</style>
