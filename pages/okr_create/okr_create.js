import API from '../../models/api';

Page({
  data: {
    keyresults: [],
    objective: ''
  },
  onLoad() {

  },
  addKeyresult() {
    let keyresults = this.data.keyresults;
    keyresults.push({title:''});
    this.setData({keyresults});
  },
  reduceKeyresult(e){
    let keyresults = this.data.keyresults;
    let index = e.currentTarget.dataset.index;
    keyresults.splice(index,1);
    this.setData({keyresults});
  },
  handleSubmit(){
    let objective = this.data.objective;
    let keyresults = this.data.keyresults;
    if(!objective || !keyresults){
      wx.showToast({
        title: '请检查目标和成果是否填写正确！',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
      return
    }
    wx.request({
      
    })
  }
})