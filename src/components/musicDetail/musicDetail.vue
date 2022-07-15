<template>
    <div class="musicDetail">
        <img :src="musicList.al.picUrl" alt="" class="detailImg" mode="	aspectFit">
        <div class="detail_top">
            <svg class="icon" aria-hidden="true" @click="closeDetail">
                <use xlink:href="#icon-fanhui1"></use>
            </svg>
            <div class="songs">
                <Vue3Marquee>
                    <div class="name">
                        {{ musicList.name }}
                    </div>
                </Vue3Marquee>
                <div class="auther">{{ authorList(musicList.ar) }}</div>
            </div>
            <svg class="icon" aria-hidden="true" style="fill:#fff">
                <use xlink:href="#icon-fenxiang1"></use>
            </svg>
        </div>
        <div class="Pointer" v-if="isShowDisk" @click="switch1(false)">
            <div class="disk" :class="{ disk_activ: !store.getters.getIsPlay, disk_pause: store.getters.getIsPlay }">
                <img :src="musicList.al.picUrl" alt="" mode="withFix" class="imgbg" />
            </div>
            <img src="../../assets/img/needle.png" alt="" class="needle"
                :class="{ needle_activ: !store.getters.getIsPlay }" mode="withFix">
        </div>

        <div class="lyric" v-else ref="lyric_box" @click="switch1(true)" style="transition: all;">
            <!-- 只有现在播放的时间在当前歌词时间和下一句歌词之间，那么当前歌词就处于被播放的状态 -->
            <div class="lyricItem"
                :class="{ lyric_active: ((store.getters.getTime * 1000) > item.time && (store.getters.getTime * 1000) < item.nextTime) }"
                v-for="(item, index) in musicLyric " :key="index">
                {{ item.lyric }}
            </div>
        </div>

        <div class="controls">
            <div class="controls_top">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xihuan-xianxing"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-download"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-Kge"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun1"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shunxu"></use>
                </svg>
            </div>
            <div class="controls_conter">
                <div class="progresss">
                    <div class="newTime">{{ changeTime(Math.floor(musicTime)) || newData }}</div>
                    <Slider class="input" button-size="12" @change="ranges" @drag-start="dragStart" @drag-end="dragEnd"
                        min="0" :max="store.getters.getDurations" v-model="musicTime" step="0.05" />
                    <div class="durationTime">{{ changeTime(store.getters.getDurations) }}</div>
                </div>
            </div>
            <div class="controls_bottom">
                <div class="controls_item">
                    <svg class="icon" aria-hidden="true" @click="switchMusic(false)">
                        <use xlink:href="#icon-shangyishou"></use>
                    </svg>
                    <svg class="icon1" aria-hidden="true" @click="play(false)" v-if="store.getters.getIsPlay">
                        <use xlink:href="#icon-bofang2"></use>
                    </svg>
                    <svg class="icon1" aria-hidden="true" @click="play(true)" v-else>
                        <use xlink:href="#icon-zanting4"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click='switchMusic(true)'>
                        <use xlink:href="#icon-048caozuo_xiayishou"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { defineProps, onMounted, defineEmits, ref, computed, watch } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css' //局部注册走马灯
import { Slider } from 'vant';
const newData = '00:00'
const props = defineProps({
    musicList: {
        type: Array,
        default: () => { [] }
    }
})
const lyric_box = ref()
let isShowDisk = ref(true)
// 通过defineEmits(['playMusic'])调用父组件的自定义事件
const emit = defineEmits(['playMusic', 'getDuration', 'changeTime', 'dragStart', 'dragEnd'])
const store = useStore()
const closeDetail = () => {
    store.commit('changeDetail', false)
    store.commit("setBottom", true)
}
const ranges = (e) => {
    console.log("------", e)
    store.commit('changeTime', e)
    emit('changeTime', e)
}
//拖动开始时触发
const dragStart = () => {
    emit('dragStart')
}
//拖拽结束 
const dragEnd = () => {
    emit('dragEnd')
}
onMounted(() => {
    console.log("歌曲详情里", props.musicList)
    console.log("歌词", musicLyric.value)
    console.log("歌曲总时长", store.getters.getDurations)
    emit('getDuration') //调用父组件里的方法获取歌曲总时长
})
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
//处理时间
const changeTime = (time) => {
    if (time) {
        if ((time) > 60) {
            let min = Math.floor((time) / 60)
            let sec = (time) % 60
            return (min > 10 ? min : '0' + min) + ":" + (sec > 10 ? Math.floor(sec) : '0' + Math.floor(sec))
        } else {
            return '00:' + (time > 10 ? time : '0' + time)
        }
    }

}
//滚动的高度
// const scrollHeight = computed(() => {
//     let num = 0
//     musicLyric.value.forEach(item => {
//         if ((store.getters.getTime * 1000) > item.time && (store.getters.getTime * 1000) < item.nextTime) {
//             num = item.num
//         }
//     })
//     return num
// })
const musicLyric = computed(() => { //处理歌词
    let arr = []
    if (store.getters.getLyric.lyric) {
        //slice包头不包尾
        arr = store.getters.getLyric.lyric.split(/[(\r\n)\r\n]+/)//根据正则来分割字符串
            .map((item) => {
                let min = item.slice(1, 3)  //切割分
                let sec = item.slice(4, 6)     //切割秒
                let mill = parseInt(item.slice(7, 9)) //切割毫秒 
                let lyric = item.slice(11, item.length)   //切割歌词
                let time = min * 60 * 1000 + sec * 1000 + mill   //当前时间毫秒
                return { min, sec, mill, lyric, time }
            })
        //向数组里添加下一句歌词播放的时间
        arr.forEach((item, index) => {
            if (index !== arr.length - 1) {
                item.nextTime = arr[index + 1].min * 60 * 1000 + arr[index + 1].sec * 1000 + arr[index + 1].mill
                item.num = index
            } else {
                item.nextTime = store.getters.getDurations * 1000
                item.num = index
            }
        })
        console.log("歌词对象", arr)

    }
    return arr
})
const musicTime = computed(() => {
    return store.getters.getTime
})
watch(musicTime, (newTime) => { //监听歌曲时间变化
    let item = document.querySelector('.lyric_active')
    let index = store.getters.getIndex
    let lastIndex = store.getters.getPlayList.length - 1

    if (item) {
        console.log('--------------', lyric_box.value.scrollTop)
        console.log("************", item.offsetTop)
        if (item.offsetTop > 300) { //判断高亮歌词据顶部的距离，如果高亮歌词距离顶部大于300
            lyric_box.value.scrollTop = item.offsetTop - 300  //让高亮的歌词始终距离顶部300px
        }
    }

    if (newTime >= store.getters.getDurations) {//如果下一次的时间大于等于歌曲总时间则就播放下一首歌曲
        if (index >= lastIndex) {  //如果进度条是歌单中的最后一首歌曲时，则播放第一首
            store.commit("changeMusic", 0) //当歌单里只有一首歌曲时需要调用播放音乐方法才会播放
            emit('playMusic', false)
            store.commit('changeTime', 0)
        } else {
            store.commit("changeMusic", index + 1)
            store.commit('changeTime', 0)

        }

    }
})
const play = (state) => {
    emit('playMusic', state)
}
//歌词与磁盘切换
const switch1 = (state) => {
    isShowDisk.value = state
}
//歌曲切换
const switchMusic = (state) => {
    let index = store.getters.getIndex
    let lastIndex = store.getters.getPlayList.length - 1
    if (state) { //true为下一首
        if (index >= lastIndex) {
            store.commit("changeMusic", 0)
        } else {
            store.commit("changeMusic", index + 1)

        }

    } else {//false为上一首
        if (index == 0) {
            store.commit("changeMusic", lastIndex)

        } else {
            store.commit("changeMusic", index - 1)

        }

    }
}
</script>
<style lang="less" scoped>
.musicDetail {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .detailImg {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0rem;
        bottom: 0rem;
        left: 0rem;
        right: 0rem;
        z-index: -1;
        filter: blur(15px);

    }

    .detail_top {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: relative;
        z-index: 2;

        .icon {
            fill: #fff;
        }

        .songs {
            width: 4rem;
            text-align: center;

            .name {
                font-size: .3rem;
                font-weight: 600;
                color: #fff;

            }

            .auther {
                font-size: .24rem;
                color: #f0f0f0;
            }
        }
    }

    .lyric {
        width: 100%;
        height: 10rem;
        overflow: scroll;

        .lyricItem {
            margin: 0 auto;
            width: 80%;
            line-height: 2.6;
            color: #fff;
            // background-color: #999;
        }

        .lyric_active {
            font-size: .40rem;
            color: #00ff00;
            font-weight: 600;
        }


    }



    .Pointer {
        position: relative;
        width: 100%;
        height: 10rem;
        overflow: hidden;

        .disk {
            background: url('../../assets/img/disk.png');
            background-size: 100% 100%;
            position: absolute;
            top: 2.3rem;
            left: 50%;
            margin-left: -2rem;
            width: 4rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: run 5s linear 0s infinite;

            .imgbg {
                width: 2.7rem;
                border-radius: 50%;
            }
        }

        .disk_active {
            animation-play-state: running;
        }

        .disk_pause {
            animation-play-state: paused;

        }

        @keyframes run {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .needle {
            transform-origin: 0 0;
            transform: rotate(-5deg);
            transition: all 2s;
            position: absolute;
            top: 0rem;
            left: 50%;
            width: 2rem;
            z-index: 2;
        }

        .needle_activ {
            transform-origin: 0 0;
            transform: rotate(11deg);
            transition: all 2s;
            position: absolute;
            top: 0rem;
            left: 50%;
            width: 2rem;
            z-index: 2;
        }
    }

    .controls {
        .controls_top {
            display: flex;
            align-items: center;
            justify-content: space-evenly;

            .icon {
                height: 0.5rem;
                width: 0.5rem;
                fill: #f0f0f0;
            }
        }

        .controls_conter {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: .6rem;

            .progresss {
                width: 80%;
                display: flex;
                align-items: center;

                .input {
                    margin: 0rem .3rem;
                }

                .newTime {
                    font-size: .24rem;
                }

                .durationTime {
                    font-size: .24rem;

                }
            }
        }

        .controls_bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .controls_item {
                width: 3rem;
                height: 1.3rpx;
                display: flex;
                align-items: center;
                justify-content: space-around;
                margin: 0 auto;

                .icon {
                    fill: #f0f0f0;
                    width: .5rem;
                    height: .5rem;
                }

                .icon1 {
                    fill: #f0f0f0;
                    width: .9rem;
                    height: .9rem;
                }
            }
        }
    }
}
</style>
