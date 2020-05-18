import API from './../../models/api'
const app = getApp();

Page({
  data: {
    todoId: '',
    keyresults: []
  },
  onLoad(options) {
    this.setData({
      todoId: options.id,
    })
  },
  onShow() {
    let todoId = this.data.todoId;
    let user_id = app.globalData.userInfo.id;
    console.log(user_id)
    let _this = this;
    wx.request({
      url: API.todo_keyesult,
      data: { todoId,user_id },
      success(res) {
        _this.setData({
          keyresults: res.data.data,
        })
      }
    })
  },
  handleActive(e) {
    let id = this.data.todoId;
    let krId = e.currentTarget.dataset.id;
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确定关联这条KR吗？',
      success: (result) => {
        if (result.confirm) {
          wx.request({
            url: API.todo_keyesult,
            data: { id, krId },
            method: 'POST',
            success(res) {
              if (res.data.code === 200) {
                _this.onShow()
              }
            }
          })
        }
      }
    })
  },
  handleRemove(e) {
    let id = this.data.todoId;
    let krId = e.currentTarget.dataset.id;
    let _this = this;
    wx.showModal({
      title: "提示",
      content: '取消关联成功！',
      success: (result) => {
        if (result.confirm) {
          wx.request({
            url: API.todo_keyesult,
            data: { id, krId },
            method: 'PUT',
            success(res) {
              if (res.data.code === 200) {
                _this.onShow()
              }
            }
          })
        }
      }
    })
  }
})