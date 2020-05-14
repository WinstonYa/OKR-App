import API from './../../models/api'

Page({
  data: {
    todoId: '',
    keyresults: []
  },
  onLoad(options) {
    this.setData({
      todoId: options.id,
    })
    console.log(options.id)
  },
  onShow() {
    let todoId = this.data.todoId;
    let _this = this;
    wx.request({
      url: API.todo_keyesult,
      data: { todoId },
      success(res) {
        console.log(res)
        _this.setData({
          keyresults: res.data.data,
        })
      }
    })
  }
})