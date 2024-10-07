const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')
const auth = require('../middleware/auth')

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Criação de sala
 *     description: Cria uma nova sala de reunião.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               jd:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *       400:
 *         description: Erro na criação da sala
 */


router.post('/', auth, roomController.createRoom)

router.get('/', roomController.getRooms)

router.get('/:id', roomController.getRoomById)

router.put('/:id', auth, roomController.updateRoom)

router.delete('/:id', auth, roomController.deleteRoom)

router.post('/join', auth, roomController.joinRoom);

module.exports = router
