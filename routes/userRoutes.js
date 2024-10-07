const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuário
 *     description: Autentica o usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/login', userController.loginUser)

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de usuário
 *     description: Cria um novo usuário na plataforma.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na criação do usuário
 */
router.post('/register', userController.registerUser)




module.exports = router
