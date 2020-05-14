import API from './../../models/api';

Page({
  data: {
    todos: []
  },
  onLoad() {
    this.onShow()
  },
  onShow() {
    let _this = this;
    wx.request({
      url: API.todo,
      success(res) {
        let todos = res.data.data.filter(item => item.status === 1);
        _this.setData({
          todos: todos
        })
      }
    })
  },
  showActionSheet(e) {
    let id = e.currentTarget.dataset.id;
    let _this = this;
    wx.showActionSheet({
      itemList: ['未完成', '删除'],
      success(res) {
        switch (res.tapIndex) {
          case 0:
            _this.updateStatus(e);
            break;
          case 1:
            wx.request({
              url: API.todo,
              method: 'DELETE',
              data: { id },
              success(res) {
                if (res.data.code == 200) {
                  _this.onLoad();
                }
              }
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  updateStatus(e) {
    let id = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    let _this = this
    if (!id) return;
    wx.request({
      url: API.todo,
      method: 'PUT',
      data: { id, status },
      success(res) {
        if (res.data.code === 200) {
          _this.onLoad();
        }
      },
      fail(e) {
        console.log(e)
      }
    })
  }
})