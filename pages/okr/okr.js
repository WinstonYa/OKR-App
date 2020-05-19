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
  showActionSheet(e) {
    let id = e.currentTarget.dataset.id;
    let _this = this;
    wx.showActionSheet({
      itemList: ['查看', '编辑', '已完成', '删除'],
      success(res) {
        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: "/pages/okr_detail/okr_detail"
            })
            break;
          case 1:
            wx.navigateTo({
              url: "/pages/okr_edit/okr_edit?id=" + id
            })
            break;
          case 2:
            break;
          case 3:
            _this.removeObjective(id);
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  removeObjective(id) {
    let _this = this;
    wx.request({
      url: API.okr + '/' + id,
      method: 'DELETE',
      data: { id },
      success(res) {
        console.log(res)
        if(res.data.code == 200){
          _this.onLoad();
        }
      }
    })
  }
})