import request from "../request/request.js";

  //获取歌词
  export const musicLyric =params=>request({
    url: "/lyric",
    params,
  });
 