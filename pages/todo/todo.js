import API from './../../models/api';

Page({
  data: {
    todos: [],
    value: ''
  },
  onLoad() {
    this.onShow()
  },
  onShow() {
    let _this = this;
    wx.request({
      url: API.todo,
      success(res) {
        let todos = res.data.data.filter(item => item.status === 0);
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
      itemList: ["关联", "完成", "删除"],
      success(res) {
        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '/pages/todo_keyresult/todo_keyresult?id=' + id
            })
            break;
          case 1:
            _this.updateStatus(e);
            break;
          case 2:
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
    let _this = this
    let id = e.currentTarget.dataset.id;
    let status = e.currentTarget.dataset.status;
    if (!id) return;
    wx.request({
      url: API.todo,
      method: 'PUT',
      data: { id, status },
      success(res) {
        if (res.data.code == 200) {
          _this.onLoad()
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  hanleConfirm(e) {
    this.setData({
      value: e.detail.value
    })
  },
  handleBlur() {
    let _this = this
    let value = this.data.value;
    wx.request({
      url: API.todo,
      method: 'POST',
      data: { value },
      success(res) {
        if (res.data.code === 200) {
          _this.setData({
            value: ''
          })
          _this.onLoad()
        }
      },
      fail(e) {
        console.log(res.errMsg)
      }
    })
  }
})
