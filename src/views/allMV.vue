<template>
    <div class="login_box">
        <div class="login_top">
            <svg class="icon" aria-hidden="true" @click="router.go(-1)">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <div class="title">
                全部MV
            </div>
        </div>
        <div class="topBar">
            <div class="item" :class="{ 'active': current == index }" v-for="(item, index) in tarBar" :key="index"
                @click="change(index)">{{ item }}</div>
            <Icon name="apps-o" size="20" @click="changeLayout"/>
            <div class="more" @click="openPopup">
                <text>筛选</text>
                <Icon name="filter-o" size="20"/>
            </div>

        </div>
        <div class="mv_list">
            <Loading vertical v-if="!music.list.length" color="#0094ff">加载中...</Loading>
            <itemVue v-for="(item, index) in music.list" :key="index" :mvItem="item" :iSHorizontally="layout"
                @click="goDetail(item.id)"></itemVue>
        </div>
        <Popup v-model:show="isShow" position="bottom" :style="{ height: '50%', width: '100%' }">
            <screening ref="screen" :chooseContent="content.list" @enterScreening="screeningMv"
                @closePopup="closePopup"></screening>
        </Popup>

    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { exclusiveMv, musicMv, musicMvAll } from '../api/mv.js'
import { Loading, Popup,Icon} from 'vant'
import itemVue from '../components/mv/mv_item.vue';
import screening from '@/components/mv/screening'
import { useRouter } from "vue-router"
const router = useRouter()
const tarBar = ref(['最新MV', '网易出品MV'])
const screen = ref(null)
const mvId = ref(null)
const content = reactive({
    list: [
        {
            title: '语种', type: 'Languages', chooseList: ['内地', '港台', '欧美', '韩国', '日本']
        },
        {
            title: '分类', type: 'classification', chooseList: ['官方版', '原声', '现场版', '网易出品']
        },
        { title: '排序', type: 'sorting', chooseList: ['上升最快', '最热', '最新'] }

    ]
})
const music = reactive({
    list: [],
})

//  const comment = ref([]) //地址不发生改变，一直是响应式的，provide传值

const layout = ref(true)
const current = ref(0)
const isShow = ref(false)
const change = (index) => {
    music.list = []
    current.value = index
    window.scrollTo(0, 0)//控制滚动条
    if (index == 0) {
        newMusicMv()
    }
    if (index == 1) {
        getExclusiveMv()
    }

}
onMounted(() => {
    newMusicMv()
})
const openPopup = () => {
    isShow.value = !isShow.value
}
const goDetail = (id) => {
    mvId.value = id
    router.push({
        path: "/videoDetail",
        query:{id:id}
    })
}
//关闭幕层
const closePopup = () => {
    isShow.value = false
}
//切换布局
const changeLayout = () => {
    console.log("子组件", screen.value)
    layout.value = !layout.value
}
//最新MV
const newMusicMv = async () => {
    const res = await musicMv()
    console.log("最新mv", res)
    music.list = res.data.data
}
//官方出品
const getExclusiveMv = async () => {
    const res = await exclusiveMv()
    music.list = res.data.data
    console.log("官方出品", res)

}
//筛选
const screeningMv = async () => {
    music.list=[]
    console.log("***********", screen.value)
    const res = await musicMvAll({
        area: screen.value.newList[0].changeItem,
        type: screen.value.newList[1].changeItem,
        order: screen.value.newList[2].changeItem,
        limit: 30
    })
    music.list = res.data.data
    window.scrollTo(0, 0)//控制滚动条
    console.log("筛选", res)
}

</script>
<style lang="less" scoped>
.login_box {
    width: 100%;
    // height: 100vh;
    box-sizing: border-box;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

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

    .topBar {
        width: 100%;
        height: .5rem;
        display: flex;
        align-items: center;
        margin-top: 1rem;

        justify-content: space-around;
        position: fixed;
        top: 0rem;
        background-color: #fff;
        z-index: 55;

        .item {}

        .more {
            display: flex;
            align-items: center;

            text {
                font-size: .24rem;
            }

            .icon {}
        }

        .active {
            border-bottom: .04rem;
            color: #D59F9D;
        }
    }

    .mv_list {
        width: 100%;
        overflow: hidden;
        margin-top: .3rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>
