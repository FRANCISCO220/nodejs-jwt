const {Router} = require('express')
const router = Router()

const userController = require('../controllers/user.controller')
const {verifyToken , isModerator,isAdmin} = require('../middlewares/verifyToken')


router.get('/user',verifyToken,isModerator,userController.listUser)

router.get('/user/:id',verifyToken,isModerator,isAdmin,userController.oneUser)

router.post('/user',verifyToken,isAdmin,userController.createUser)

router.put('/user/:id',verifyToken,isAdmin,userController.updateUser)

router.delete('/user/:id',verifyToken,isAdmin,userController.deleteUser)

module.exports = router