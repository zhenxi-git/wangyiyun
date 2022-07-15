import request from "../request/request.js";

  //歌手列表
  export const SingerList =params=>request({
    url: "/artist/list",
    params,
  });
 //歌手详情
 export const SingerDetail=params=>request({
    url: "/artist/detail",
    params,
  });
  //相似歌手
  export const simISinger=params=>request({
    url: "/simi/artist",
    params,
  });
  //歌手描述
  export const SingerDesc=params=>request({
    url: "/artist/desc",
    params,
  });
  //歌手专辑
  export const SingerAlbum=params=>request({
    url: "/artist/album",
    params,
  });
  //歌手MV
  export const SingerMv=params=>request({
    url: "/artist/mv",
    params,
  });
  //歌手粉丝
  export const SingerFans=params=>request({
    url: "/artist/fans",
    params,
  });
//歌手粉丝数量
export const SingerFansCount=params=>request({
    url: "/artist/follow/count",
    params,
  });
  //歌手热门50曲
  export const SingerSong=params=>request({
    url: "/artist/top/song",
    params,
  });
