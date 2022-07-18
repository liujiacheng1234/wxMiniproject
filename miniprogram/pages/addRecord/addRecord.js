// pages/addRecord/addRecord.js
let inName
let inNote
let contact

let dataTime
let yy = new Date().getFullYear()
let mm = new Date().getMonth()+1
let dd = new Date().getDate()
let hh = new Date().getHours()
let mf = new Date().getMinutes()<10?'0'+new Date().getMinutes():
  new Date().getMinutes()
let ss = new Date().getSeconds()<10?'0'+new Date().getSeconds():
  new Date().getSeconds()
  dataTime = `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('进入页面所携带的数据',options)
        contact = options.id
    },
    //获取用户输入
    getName(e){
        console.log('用户输入的样品名字',e.detail.value)
        inName = e.detail.value
    },
    getNote(e){
        console.log('用户输入的备注',e.detail.value)
        inNote = e.detail.value
    },

    commit(){
        wx.cloud.database().collection('record')
        .add({
            data:{
                name:inName,
                note:inNote,
                contact_keti:contact,
                time:dataTime
            }
        })
        .then(res=>{
            console.log('添加成功')
            wx.showToast({
                title: '添加成功',
            })
        })
        .catch(err=>{
            console.log('添加失败')
            wx.showToast({
                icon:'error',
                title: '添加失败',
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})