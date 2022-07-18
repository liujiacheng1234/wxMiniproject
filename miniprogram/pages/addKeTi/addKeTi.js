// pages/addKeTi/addKeTi.js
let KeName

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

    },
    getName(e){
        console.log('管理员携带值为', e.detail.value)
        KeName =  e.detail.value
    },
    commit(){
        wx.cloud.database().collection('keti')
        .add({
            data:{
                name:KeName
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