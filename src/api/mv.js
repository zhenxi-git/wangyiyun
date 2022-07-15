
import request from "../request/request.js";
  //最新
  export const musicMv =params=>request({
    url: "/mv/first",
    params,
  });
  //全部MV
  export const musicMvAll=params=>request({
    url: "/mv/all",
    params,
  });
  //推荐MV
  export const personalizedMv=params=>request({
    url: "/personalized/mv",
    params,
  });
  //网易出品
  export const exclusiveMv=params=>request({
    url: "/mv/exclusive/rcmd",
    params,
  });
  //获取mv详情
  export const mvDetail=params=>request({
    url: "/mv/detail",
    params,
  });
  //获取mv播放地址
  export const mvUrl=params=>request({
    url: "/mv/url",
    params,
  });
  //获取相似mv
  export const mvSong=params=>request({
    url: "simi/mv",
    params,
  });
  //获取MV评论(新版)
  export const mvComment=params=>request({
    url: "/comment/new",
    params,
  });
  //获取楼层评论
  export const mvCommentFloor=params=>request({
    url: "/comment/floor",
    params,
  });