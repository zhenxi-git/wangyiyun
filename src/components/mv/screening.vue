<template>
    <div class="screening">
        <div class="screening_item" v-for="(item, index) in chooseContent" :key="index">
            <div class="title">{{ item.title }}</div>
            <div class="choose_list">
                <div class="choose_item" :class="{ active: newList[index].chooseIndex == changeIndex }"
                    v-for="(changeItem, changeIndex) in item.chooseList" :key="changeIndex"
                    @click="changeCurrent(index, changeIndex, changeItem, item.type)">
                    {{ changeItem }}
                </div>
            </div>

        </div>
        <div class="btn">
            <div class="rest" @click="reSubmit">重置</div>
            <div class="enter" @click="enSubmit">完成</div>
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps,defineExpose,defineEmits} from 'vue';
const newList = ref([
    [], [], []
])
defineProps({ //接受父组件传来的参数
    chooseContent: {
        type: Array,
        default: () => { [] }
    }
})
defineExpose({newList}) //暴露自己的属性，可以让父组件使用
const reSubmit=()=>{
    newList.value=[[],[],[]]
}
const emit=defineEmits(['enterScreening','closePopup']) //自定义事件的使用，即子组件使用父组件的放法
const enSubmit=()=>{
    emit('enterScreening') //触发自定义方法
     emit('closePopup')
}
const changeCurrent = (index, changeIndex, changeItem, types) => {
    switch (types) {
        case "Languages":
            {
                newList.value[index].changeItem = changeItem  //当前类别选中的内容
                newList.value[index].chooseIndex = changeIndex //当前类别选中的下标
            }
            break;
        case "classification":
            {
                newList.value[index].changeItem = changeItem
                newList.value[index].chooseIndex = changeIndex
            }
            break;
        case "sorting":
            {
                newList.value[index].changeItem = changeItem
                newList.value[index].chooseIndex = changeIndex
            }
            break;
        default:
            break;
    }
    console.log("最新数据", newList.value, changeIndex);
}
</script>
<style lang="less" scoped>
.screening {
    .screening_item {
        padding: .2rem .4rem;

        .title {
            font-size: .32rem;
            font-weight: 600;
            width: 100%;
            text-align: left;
            margin-bottom: .16rem;
        }

        .choose_list {
            display: flex;
            justify-content: flex-start;

            .choose_item {
                box-sizing: content-box;
                display: inline-block;
                height: .5rem;
                background-color: #eee;
                border: .02rem solid #eee;
                border-radius: .3rem;
                padding: .04rem .25rem;
                line-height: .508rem;
                text-align: center;
                font-size: .22rem;
                margin-left: .2rem;
            }

            .active {
                border: .02rem solid RGBA(255, 80, 0, .5);
                background-color: RGBA(255, 0, 0, .2);
                ;
            }

        }

    }

    .btn {
        display: flex;
        justify-content: space-around;
        width: 90%;
        align-items: center;
        position: absolute;
        bottom:1.2rem;
        left: 50%;
        transform: translateX(-50%);

        .rest {
            display: inline-block;
            height: 0.6rem;
            width: 50%;
            background-color: #666;
              border-bottom-left-radius: 0.3rem;
            border-top-left-radius: 0.3rem;
            line-height: 0.6rem;
            color: #fff;

        }

        .enter {
            height: 0.6rem;
            display: inline-block;
            background-color: RGBA(255, 80, 0, 1);
            border-bottom-right-radius: 0.3rem;
            border-top-right-radius: 0.3rem;
            width: 50%;
            line-height: 0.6rem;
            color: #fff;

        }
    }
}
</style>
