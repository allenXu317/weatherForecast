const request = require('superagent')
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const url = "https://imweb.io/topic/5d230c6df7b5692b080f2668";
  // console.log(url);
  request.get(url).then(res => {
    console.log(res.text);
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

