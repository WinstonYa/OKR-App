import API from './../../models/api'

Page({
  data: {
    krId: '',
    keyresults: [],
    objective: [],
    status: ''
  },
  onLoad(options) {
    this.setData({ krId: options.id })
  },
  onShow() {
    let id = this.data.krId;
    let _this = this;
    wx.request({
      url: API.okr + '/' + 'detailShow' + '/' + id,
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            keyresults: res.data.data.krData,
            objective: res.data.data.objective,
          })
        }
      }
    })
  },
  handleActionSheet(e) {
    let id = e.currentTarget.dataset.id;
    let _this = this;
    wx.showActionSheet({
      itemList: ['标记为已完成', '删除'],
      success(res) {
        switch (res.tapIndex) {
          case 0:
            _this.handleFinished(id);
            break;
          case 1:
            _this.handleRemove(id);
        }
      },
    })
  },
  handleFinished(id) {
    let status = this.data.status;
    let _this = this;
    wx.request({
      url: API.okr + '/' + 'detailUpdate' + '/' + id,
      method: 'PUT',
      data: { status },
      success(res) {
        if (res.data.code == 200) {
          _this.onShow()
        }
      }
    })
  },
  handleRemove(id) {
    let _this = this;
    wx.request({
      url: API.okr + '/' + 'detailDelete' + '/' + id,
      method: 'DELETE',
      data: { id },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          _this.onShow();
          wx.showToast({
            title: '已删除',
            icon: 'none',
          })
        }
      }
    })
  }
})