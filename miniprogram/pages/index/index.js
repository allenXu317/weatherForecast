// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '海淀区', '海淀区'],
    temp:'',
    weatherCode:'100',
    weatherText:'',
    locationID:'101011000',
    humidity:'N/A',
    pressure:'N/A',
    vis:'N/A',
    windDir:'N/A',
    windSpeed:'N/A',
    windScale:'N/A',
    days:[],
    date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWhether();
    let dateDefault = new Date();
    this.setData({
      date:(dateDefault.getMonth()+1)+'月'+dateDefault.getDate()+'日'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.onLoad();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  // 获取天气数据
  getWhether:function() {
    let locationID = this.data.locationID;
    this.getFutureDate();
    const key = 'e62188b67619438898d2d97d70b04079';
    const url = 'https://devapi.qweather.com/v7/weather/now';
    // 接口:
    // https://devapi.qweather.com/v7/weather/now?key=e62188b67619438898d2d97d70b04079&location=101200101
    // 请求数据
    wx.request({
      url: url,
      data:{
        key:key,
        location:locationID
      },
      success: (res) => {
        console.log(res);
        let now = res.data.now;
        console.log(now.temp);
        // 更新数据
        this.setData({
          temp:now.temp+"°C",
          weatherCode:now.icon,
          weatherText:now.text,
          humidity:now.humidity + ' %',
          pressure:now.pressure + ' hPa',
          vis:now.vis + ' KM',
          windDir:now.windDir,
          windSpeed:now.windSpeed + ' km/h',
          windScale:now.windScale + ' 级'
        })
      }
    })
  },
  // 监听地点改变
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const url = "https://geoapi.qweather.com/v2/city/lookup";
    const key = 'e62188b67619438898d2d97d70b04079';
    console.log(((e.detail.value[0].indexOf("香港")>=0||e.detail.value[0].indexOf("澳门")>=0)?e.detail.value[0].substring(0,2):e.detail.value[2]));
    wx.request({
      url: url,
      data: {
        location:((e.detail.value[0].indexOf("香港")>=0||e.detail.value[0].indexOf("澳门")>=0)?e.detail.value[0].substring(0,2):e.detail.value[2]),
        adm:((e.detail.value[0].indexOf("香港")>=0||e.detail.value[0].indexOf("澳门")>=0)?e.detail.value[0].substring(0,2):e.detail.value[1]),
        key:key
      },
      // 获取地点数据成功后调用
      success:(res) => {
        
        let location = res.data.location[0].id;
        console.log(res);
        // 更新数据
        this.setData({
          // 地点ID
          locationID:location,
          // 前端页面地点展示
          region:e.detail.value
        })
        // 获取城市id后重新获取对应的天气情况
        this.getWhether();
      }
    })
  },
  // 获取日期
  // getDate:function() {
  //   console.log("ppp");
  //   let date = new Date();
  //   let today = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let newDays = [];
  //   for (let i=1;i<=3;i++) {
  //     let day = today + i + '';
  //     day = month + '/' + day;
  //     newDays.push(day);
  //   }
  //   console.log(newDays);
  //   this.setData({
  //     days:newDays
  //   })
  // },
  // 获取未来天气
  getFutureDate:function() {
    const key = 'e62188b67619438898d2d97d70b04079';
    const url = 'https://devapi.qweather.com/v7/weather/3d';
    console.log("ttt");
    wx.request({
      url: url,
      data:{
        location:this.data.locationID,
        key:key
      },
      success:(res)=> {
        console.log(res);
        let newDays = [];
        let daily = res.data.daily;
        console.log(daily);
        for (let i=0;i<daily.length;i++) {
          let day = daily[i];
          day.date = daily[i].fxDate.split('-').slice(1,3).join('/');
          newDays.push(day);
        }
        console.log(newDays);
        getApp().globalData.globalDays = newDays;
        this.setData({
          days:newDays
        })
      }
    })
  },
  getDayInfo:function(e) {
    let index = e.currentTarget.dataset.index;
    // let day = this.data.days[index];
    wx.navigateTo({
      url: '../dayInfo/dayInfo?index='+index
    })
  }
})