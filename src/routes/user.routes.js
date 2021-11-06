const {Router} = require('express')
const router = Router()

const userController = require('../controllers/user.controller')

router.get('/user',userController.listUser)
router.get('/user/:id',userController.oneUser)
router.post('/user',userController.createUser)
router.put('/user/:id',userController.updateUser)
router.delete('/user/:id',userController.deleteUser)

module.exports = router