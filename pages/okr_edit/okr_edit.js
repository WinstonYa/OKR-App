import API from './../../models/api';

Page({
  data: {
    krId: '',
    deleteId: [],
    title: '',
    keyresults: []
  },
  onLoad(options) {
    this.setData({ krId: options.id })
  },
  onShow() {
    let _this = this;
    let id = this.data.krId;
    wx.request({
      url: API.okr + '/' + 'editShow' + '/' + id,
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            title: res.data.data.title,
            keyresults: res.data.data.keyresults
          })
        }
      }
    })
  },
  //获取Objective的title
  handleTitle(e) {
    let value = e.detail.value;
    this.setData({ title: value })
  },
  //获取keyresults的值
  handleKeyresult(e) {
    let value = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
    keyresults[index].title = value;
    this.setData({ keyresults });
  },
  //增加keyresult成果
  addKeyresult() {
    let keyresults = this.data.keyresults;
    keyresults.push({ title: '' });
    this.setData({ keyresults });
  },
  //删除成果获取删除项的id
  removeKeyresult(e) {
    let keyresults = this.data.keyresults;
    let deleteId = this.data.deleteId;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    keyresults.splice(index, 1);
    if(id){
      deleteId.push(id);
    } 
    this.setData({ keyresults,deleteId });
  },
  handleSubmit() {
    let id = this.data.krId;
    let title = this.data.title;
    let keyresults = this.data.keyresults;
    let deleteId = this.data.deleteId;
    console.log(deleteId)
    let krTitle = keyresults.every(data => data.title);
    if (!keyresults || !title || !krTitle) {
      wx.showToast({
        title: '请填写必要参数',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: API.okr + '/' + 'edit' + '/' + id,
      method: 'PUT',
      data: { title, keyresults, deleteId },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
          })
          wx.switchTab({ url: "/pages/okr/okr" })
        }
      }
    })
  }
})