// miniprogram/pages/dayInfo/dayInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    days:[],
    date:'',
    tempMax:'',
    tempMin:'',
    weatherIcon:'100',
    weatherText:'100',
    sunrise:'',
    sunset:'',
    uvIndex:'',
    windDirDay:'',
    windScaleDay:''
  },

  app:getApp(),

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("pppp");
    // console.log(options.index);
    // console.log(this.app.globalData.globalDays);
    this.getDatas(options,this.app);
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
  getDatas:function(options,app) {
    let that = this;
    this.setData({
      index:options.index,
      days:that.app.globalData.globalDays
    });
    this.getInfo();
  },
  getInfo:function() {
    let day = this.data.days[this.data.index];
    this.setData({
      date:day.date,
      tempMax:day.tempMax,
      tempMin:day.tempMin,
      weatherIcon:day.iconDay,
      weatherText:day.textDay,
      sunrise:day.sunrise,
      sunset:day.sunset,
      uvIndex:day.uvIndex,
      windDirDay:day.windDirDay,
      windScaleDay:day.windScaleDay
    })
  }
})