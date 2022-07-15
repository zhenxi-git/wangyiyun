import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import itemMusic from "../views/itemMusic.vue"
import Search from "../views/search.vue"
import infoUser from "../views/infoUser.vue"
import video from "../views/video.vue"
import singer from '../views/singer.vue'
import rankingPage from '../views/rankingPage.vue'
import videoDetail from '../views/videoDetail.vue'
import login from '../views/login.vue'
import singerDetail from '../views/singerDetail.vue'
import allMV from '../views/allMV.vue'
import store from "../store";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/itemMusic",
    name: "ItemMusic",
    component: itemMusic,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/infoUser",
    name: "infoUser",
    component: infoUser,
    beforeEnter: (to, from, next) => { //路由守卫，进入路由之前要做的事
       if(store.state.isLogin||store.state.Token||localStorage.getItem('Token')){ //如果已经登录就放行，没有登录就取登录页面
            next()
       }else{
         next('./login')
       }
    }
  },
  {
    path: "/video",
    name: "video",
    component: video,
  },
  {
    path: "/singer",
    name: "singer",
    component: singer,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/rankingPage",
    name: "rankingPage",
    component: rankingPage,
  },
  {
    path: "/allMV",
    name: "allMV",
    component: allMV,
  },
  {
    path: "/videoDetail",
    name: "videoDetail",
    component: videoDetail,
  },
  {
    path: "/singerDetail",
    name: "singerDetail",
    component: singerDetail,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to,from)=>{  //路由全局守卫,to要去往的页面路径,from是现在所在的页面
  console.log("to",to)
  console.log("from",from)
  if(to.path=='/login'||to.path=='/videoDetail'){
    store.state.isFullScreen=false
  }else{
    store.state.isFullScreen=true
  }
})
router.beforeEach((to,from)=>{
    if(to.path=="/"||to.path=="/video"||to.path=="/singer"||to.path=="/infoUser"){
            store.state.isShowBottom=true
            console.log("from",from)
    }else{
      store.state.isShowBottom=false
    }
})
export default router;
