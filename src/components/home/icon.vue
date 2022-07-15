<template>
    <div class="hone_icon">
        <div class="icon_box">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-meirituijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="icon_box">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sirenFM"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="icon_box">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="icon_box" @click="goRanking">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>
<script setup>
  import {useRouter} from 'vue-router'
  const router=useRouter()
  const goRanking=()=>{
      router.push({
          name:'rankingPage'
      })
  }
</script>
<style lang="less" scoped>
.hone_icon {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: .02rem solid rgba(0,0,0,0.08);
    padding-bottom: .2rem;
    padding-top: 0.4rem;
    background-color: #fff;
    .icon_box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .icon {
            width: 1rem;
            height: 1rem;
        }

        span {
            margin-top: .08rem;
            font-size: .3rem;
        }
    }

}
</style>
