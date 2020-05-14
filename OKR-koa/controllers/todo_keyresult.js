const TodoKeyresult = require('../models/todo_keyresult');
const Keyresult = require('../models/keyresult');
const Objective = require('../models/objective');

const todoKeyresultController = {
  keyresult: async function (ctx, next) {
    let todo_id = ctx.query.todoId;
    console.log(todo_id)
    let user_id = 1;
    let params = {
      user_id: user_id,
      status: 0
    }

    let objectives = await Objective.select(params);
    let objective_ids = objectives.map(data => data.id);
    let keyresults = await Keyresult.knex().whereIn('objective_id', objective_ids);
    let todoKeyresults = await TodoKeyresult.select({todo_id});
    let keyresult_ids = todoKeyresults.map(data => data.keyresult_id)

    let okr = {};
    objectives.forEach(item => {
      item.keyresults = [],
      okr[item.id] = item
    })

    keyresults.forEach(item => {
      if(item.objective_id == okr[item.objective_id].id){
        okr[item.objective_id].keyresults.push(item)
        item.active = keyresult_ids.includes(item.id)
      }
    })
    ctx.body = {
      code: 200,
      data: okr
    }
  }
}

module.exports = todoKeyresultController