const {Router} = require('express')
const router = Router()

const authController = require('../controllers/auth.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.get('/me',verifyToken.verifyToken,authController.me)



module.exports = router