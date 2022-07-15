import request from "../request/request.js";

  //手机号登录
  export const musicCellphone =params=>request({
    url: "/login/cellphone",
    params,
  });
 //er  二维码登录

 export const musicKey=params=>request({
    url: "/login/qr/key",
    params,
  });
  //生成二维码
 export const musicCreateKey=params=>request({
    url: '/login/qr/create',
    params,
  });
  //二维码扫描状态

  export const musicCreateCheck=params=>request({
    url: '/login/qr/check',
    params,
  });
  //获取用户详情
  export const userDetail=params=>request({
    url: '/user/detail',
    params,
  });
  //获取用户歌单

  export const userList=params=>request({
    url: '/user/playlist',
    params,
  });
