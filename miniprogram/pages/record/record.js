// pages/record/record.js
let arr = []
let keIndex = 0
let keArr = []

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        index: 0,
        ObjectArr:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },
    //查找keti
    getKeTiList() {
        // let len = this.data.list.length
        // console.log('当前list长度', len)
        //加载数据
        wx.cloud.database().collection('keti')
            .get().then(res => {
                console.log('请求成功', res)
                // let dataList = res.data
                // if (dataList.length <= 0) {
                //     wx.showToast({
                //         title: '没有更多数据了',
                //     })
                // }
                for (var i = 0; i < res.data.length; i++) {
                    arr.push(res.data[i].name)
                }
                keArr = res.data
                console.log('arr携带的值',arr)
                console.log('课题数组携带的值',keArr)
                this.setData({
                    // list: this.data.list.concat(res.data),
                    array: res.data,
                    ObjectArr:arr
                })
                this.getRecordList()
            })
            .catch(err => {
                console.log('请求失败', err)
            })
    },
    //选择器
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        keIndex = e.detail.value
        this.setData({
            list:[]
        })
        this.getRecordList()
        
    },

    //跳转至增加课题
    addKeTi(){
        wx.navigateTo({
            url: '/pages/addKeTi/addKeTi',
        })
    },
    //跳转至增加记录
    addRecord(e){
        console.log('addRecord携带',e)
        wx.navigateTo({
            url: '/pages/addRecord/addRecord?id='+e.currentTarget.dataset.id
        })
    },
    //查询记录
    getRecordList(){
        let len = this.data.list.length
        console.log('当前list长度',len)
        console.log('课题数组',keArr[keIndex]._id)
        //加载数据
        wx.cloud.database().collection('record').where({
            contact_keti:keArr[keIndex]._id
        })
        .skip(len)
        .get().then(res =>{
            console.log('请求成功',res)
            let dataList= res.data
            if(dataList.length<=0){
                wx.showToast({
                  title: '没有更多数据了',
                })
            }
            this.setData({
                //list:res.data
                list:this.data.list.concat(res.data)
            })
            
        })
        .catch(err => {
            console.log('请求失败',err)
        })
    },
    //删除课题
    delKeTi(){
        //课题数组id=====keArr[keIndex]._id
        let that = this
        wx.showModal({
            title: '提示',
            content: '删除后数据将丢失',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定'),
                    that.keTiDel()
                    that.onShow()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    keTiDel(){
        wx.cloud.database().collection('keti').doc(keArr[keIndex]._id)
        .remove().then(res => {
            console.log('删除成功')
            this.setData({
                list: []
            })
            this.delRecord()
            wx.showToast({
                title: '删除成功',
                icon: 'success',
            })

        }).catch(err => {
            console.log('删除失败',err)//失败提示错误信息
        })
    },
    delRecord(){
        wx.cloud.database().collection('record')
        .where({
            contact_keti : keArr[keIndex]._id
        })
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
        console.log('返回页面了')
        this.getKeTiList()
        this.setData({
            list:[],
            ObjectArr:[]
        })
        arr = []
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
        this.onShow()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        console.log('下拉触底了')
        this.getRecordList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})