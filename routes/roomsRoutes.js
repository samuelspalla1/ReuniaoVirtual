const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')
const auth = require('../middleware/auth')


router.post('/', auth, roomController.createRoom)

router.get('/', roomController.getRooms)

router.get('/:id', roomController.getRoomById)

router.put('/:id', auth, roomController.updateRoom)

router.delete('/:id', auth, roomController.deleteRoom)

router.post('/join', auth, roomController.joinRoom);

module.exports = router
