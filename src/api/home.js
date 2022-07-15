import request from "../request/request.js";
export const getBanner =params=>request({
    url: "/banner",
    params,
  });
  
// export const getBanner = (params) => { 是上面写法的全写
//   return request({
//     url: "/banner",
//     params,
//   });
// };
//获取推荐歌单
export const personalized =params=>request({
    url: "/personalized",
    params,
  });
  //获取歌单详情
  export const musicDetail =params=>request({
    url: "/playlist/detail",
    params,
  });
  //获取歌单歌曲
  export const musicAll =params=>request({
    url: "/playlist/track/all",
    params,
  });
  //最新音乐
  export const newSong =params=>request({
    url: "/personalized/newsong",
    params,
  });
  //获取歌曲详情
 
  export const SongDetail =params=>request({
    url: "/song/detail",
    params,
  });