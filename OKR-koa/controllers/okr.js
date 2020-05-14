const ObjectiveModule = require('../models/objective');
const { formatTime } = require('../utils/date');

const okrList = {
  all: async function (ctx, next) {
    try {
      let objective = await ObjectiveModule.all();
      objective.forEach(item => {
        item.created_time = formatTime(item.created_time)
        if (item.finished_time) {
          item.finished_time = formatTime(item.finished_time)
          return
        }
      })
      ctx.body = ({
        code: 200,
        data: objective
      })
    } catch (e) {
      ctx.body = {
        code: 0,
        message: e
      }
    }
  },
}

module.exports = okrList