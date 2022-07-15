import request from "../request/request.js";

  //获取歌词
  export const musicSearch =params=>request({
    url: "/search",
    params,
  });
 