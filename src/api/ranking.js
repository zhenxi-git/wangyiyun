import request from "../request/request.js";

  //排行榜
  export const musicToplist =params=>request({
    url: "/toplist",
    params,
  });
 
   //所以排行榜摘要
   export const musicToplistDetail =params=>request({
    url: "/toplist/detail",
    params,
  });
 