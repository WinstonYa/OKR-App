import API from './../../models/api';

Page({
  data: {
    okrList: []
  },
  onLoad() {
    this.onShow();
  },
  onShow() {
    let _this = this;
    wx.request({
      url: API.okr,
      success(res) {
        if (res.data.code === 200) {
          _this.setData({
            okrList: res.data.data
          })
        }
      }
    })
  },
  addObjective() {
    wx.navigateTo({
      url: "/pages/okr_create/okr_create",
    })
  },
  showActionSheet() {
    wx.showActionSheet({
      itemList: ['查看', '编辑', '已完成', '删除'],
      success(res) {
        console.log(res.tapIndex)
        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: "/pages/okr_detail/okr_detail"
            })
            break;
          case 1:
            wx.navigateTo({
              url: "/pages/okr_edit/okr_edit"
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})