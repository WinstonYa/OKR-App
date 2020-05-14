const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('../controllers/test');
const todoController = require('../controllers/todo');
const okrController = require('../controllers/okr');
const todoKeyresultController = require('../controllers/todo_keyresult');

router.get('/test', testController.test);

router.get('/todo', todoController.all);
router.put('/todo', todoController.update);
router.post('/todo', todoController.insert);
router.delete('/todo', todoController.delete);

router.get('/okr', okrController.all);

router.get('/todoKeyresult', todoKeyresultController.keyresult);

module.exports = router