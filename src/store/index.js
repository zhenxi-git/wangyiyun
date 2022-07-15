import { createStore } from "vuex";
import {musicLyric} from "../api/detail.js"
import {musicCellphone} from "../api/login"
export default createStore({
  state: {
    playList: [
      //播放列表默认值
      {
        al: {
          id: 81298536,
          name: "最后一页",
          pic: 109951165083379000,
          picUrl:
            "https://p2.music.126.net/jZvPeEvMbEgis1g5jPCqfg==/109951165083379000.jpg",
          pic_str: "109951165083379000",
        },
        ar: [
          {
            id: 12091048,
            name: "王泽科",
          },
        ],
        name: "最后一页",
        id:1388800785,
      },
      {
        al: {
          id: 147150122,
          name: "同心圆",
          pic: 109951167596441820,
          picUrl:
          "http://p3.music.126.net/4RMb8NDxp-hbO8sL76uX4w==/109951167596441828.jpg",
          pic_str: "109951167596441828",
        },
        ar: [
          {
            id: 10204,
            name: "杨千嬅",
          },
        ],
        name: "同心圆",
        id:1959420555,
      },
    ],
    playIndex: 0, //播放数组的下标,
    isPlay: true, //播放状态
    isShowDetail: false, //是否弹出歌曲详情页
    Lyric:{}, //歌词
    musicTime:0,//当前歌曲播放了多少毫秒
    duration:0,//歌曲总时长
    isLogin:false,//判断用户是否登录
    isFullScreen:true,//是否隐藏底部
    isShowBottom:false,//是否隐藏头部
    Token:'',//用户登录的唯一标识,
    user:{},//用户详情
    accountId:'',//用户id
  },
  mutations: {
    //修改state里的值
    setPlayList(state, value) {
      //修改歌曲的内容
      console.log("store",value)
      state.playList = value;
    },
    //修改播放状态--是否处于暂停，true是
    changePlay(state, value) {
      state.isPlay= value;
    },
    //切换歌曲
    changeMusic(state, value) {
      state.playIndex = value;
    },
    //改变显示隐藏的状态
    changeDetail(state, value) {
      state.isShowDetail = value;
    },
    //更改歌词
    changeLyric(state,value){
      console.log("歌词",value)
        state.Lyric=value
    },
    //时间改变
    changeTime(state,value){
        state.musicTime=value
    },
    //修改歌曲总时长
    changeDuration(state,value){
          state.duration=value
    },
    //向播放列表中添加音乐
    addMusic(state,value){
        state.playList.push(value)
    },
    //修改登录状态
    changeLogin(state,value){
        state.isLogin=value
    },
    //修改Token
    updateToken(state,value){
        state.Token=value
        //当拿到token的时候把他保存到缓存里
        localStorage.setItem("Token",value)
    },
    //用户详情
    updateUser(state,value){
          state.user=value
          localStorage.setItem("user",JSON.stringify(value))
    },
    //用户id
    updateId(state,value){
          state.accountId=value
          localStorage.setItem('userId',value)
    },
    setBottom(state,value){
       state.isShowBottom=value
    }
    
  },
  getters: {
    //获取state里的值
    getPlayList(state) {
      return state.playList;
    },
    getIndex(state) {
      //获取播放数组的下标,
      return state.playIndex;
    },
    getIsPlay(state) {
      //获取播放状态
      return state.isPlay;
    },
    getDetail(state) {
      //获取歌曲详情页的显示隐藏的状态
      return state.isShowDetail;
    },
    //获取歌词
    getLyric(state){
      return state.Lyric
    },
    //获取播放时间
    getTime(state){
          return state.musicTime
    },
    //获取歌曲总时长
    getDurations(state){
      return state.duration
    },
    //获取是否隐藏底部
    getIsFull(state){
          return state.isFullScreen
    },
    //获取Token
    getToken(state){
        return state.Token
    },
    //获取用户详情
    getUser(state){
        return state.user
    },
    //获取是否隐藏顶部
    getBottom(state){
       return state.isShowBottom
    },

  },
  //处理异步请求,调用这里面的方法用 store.dispatch ,context.commit调用mutations里的方法
  actions: {
     async getMusicLyric(context,value){ //context获取上下文
          const res=await musicLyric({
                    id:value
          })
          // console.log("歌词",res)
          context.commit('changeLyric',res.data.lrc)  
      },
      //手机号登录
      async loginPhone(context,value){
        const res=await musicCellphone({
          phone:value.phone,
          password:value.password
        })
        return res
      }   
  },
  modules: {},
});
