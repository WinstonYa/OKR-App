const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('../controllers/test');
const cors = require('../middlewares/cors')

router.get('/test', cors.allowAll, testController.test)

module.exports = router