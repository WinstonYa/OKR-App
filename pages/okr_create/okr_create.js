import API from '../../models/api';
const app = getApp();

Page({
  data: {
    keyresults: [],
    objective: ''
  },
  handleObjective(e) {
    let objective = e.detail.value;
    this.setData({ objective});
  },
  handleKeyresult(e) {
    let value = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
    keyresults[index].title = value;
    this.setData({ keyresults });
  },
  addKeyresult() {
    let keyresults = this.data.keyresults;
    keyresults.push({ title: '' });
    this.setData({ keyresults });
  },
  reduceKeyresult(e) {
    let keyresults = this.data.keyresults;
    let index = e.currentTarget.dataset.index;
    keyresults.splice(index, 1);
    this.setData({ keyresults });
  },
  handleSubmit() {
    let user_id = app.globalData.userInfo.id;
    let objective = this.data.objective;
    let keyresults = this.data.keyresults;
    if (!keyresults || !objective) {
      wx.showToast({
        title: '请填写必要参数',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: API.okr,
      method: 'POST',
      data: { user_id, objective, keyresults },
      success(res) {
        if(res.data.code == 200){
          wx.showToast({
            title: '添加成功～',
            icon: 'success'
          })
          wx.switchTab({url: "/pages/okr/okr"})
        }
      }
    })
  }
})