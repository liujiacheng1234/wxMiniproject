// pages/recordDetail/recordDetail.js
let id

let dataTime
let yy = new Date().getFullYear()
let mm = new Date().getMonth() + 1
let dd = new Date().getDate()
let hh = new Date().getHours()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log('携带的数据', options)
        id = options.id
        wx.cloud.database().collection('record').doc(id)
            .get().then(res => {
                console.log('请求成功', res)
                this.setData({
                    list: res.data
                })
            })
            .catch(err => {
                console.log('请求失败', err)
            })
    },
    bindInputName(e) {
        console.log('bindInputName携带', e.detail.value)
        // const temp = e.detail.value
        const tempList = this.data.list
        tempList.name = e.detail.value
        console.log('tempList', tempList)
        this.setData({
            list: tempList
        })

    },

    bindInputNote(e) {
        console.log('bindInputName携带', e.detail.value)
        const tempList = this.data.list
        tempList.note = e.detail.value
        console.log('tempList', tempList)
        this.setData({
            list: tempList
        })
    },

    upData() {
        let that = this
        wx.showModal({
            title: '提示',
            content: '更新之后之前的数据将丢失',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定'),
                        that.dataUp()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    dataUp() {
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
            new Date().getMinutes()
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
            new Date().getSeconds()
        dataTime = `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`;
        const tempList = this.data.list
        wx.cloud.database().collection('record').doc(id)
            .update({
                data: {
                    name: this.data.list.name,
                    note: this.data.list.note,
                    time: dataTime
                }
            }).then(res => {
                console.log('更新成功', res)
                tempList.time = dataTime
                this.setData({
                    list: tempList
                })
            })
            .catch(err => {
                console.log('更新失败', err)
            })
    },
    delData(){
        let that = this
        wx.showModal({
            title: '提示',
            content: '删除后之前的数据将丢失',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定'),
                    that.dataDel()
                    wx.navigateBack({
                        delta: 1
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    dataDel(){
        wx.cloud.database().collection('record').doc(id)
        .remove().then(res => {
            console.log('删除成功')
            this.setData({
                list: []
            })
            wx.showToast({
                title: '删除成功',
                icon: 'success',
            })
        }).catch(err => {
            console.log('删除失败',err)//失败提示错误信息
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