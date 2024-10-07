const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const http = require('http')
const socketIo = require('socket.io')
const jwt = require('jsonwebtoken')
const Room = require('./models/roomModel')

dotenv.config()
connectDB()

const app = express()

const server = http.createServer(app)
const io = socketIo(server)

app.use(express.json())
app.use(express.static('public'))

app.use('/api/auth', require('./routes/userRoutes'))
app.use('/api/rooms', require('./routes/roomsRoutes'))

function authenticateSocket(socket, next) {
    const token = socket.handshake.query.token

    if (!token) {
        return next(new Error('Token não fornecido'))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Token inválido'))
        }

        socket.userId = decoded.user.id
        next()
    });
}

io.use(authenticateSocket)

const usersInRooms = {}

io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.userId)

    socket.on('join-room', async (roomId) => {
        const room = await Room.findOne({ jd: roomId })
        if (!room) {
            return socket.emit('error', { message: 'Sala não encontrada' })
        }

        socket.join(roomId)

        if (!usersInRooms[roomId]) {
            usersInRooms[roomId] = new Set()
        }
        usersInRooms[roomId].add(socket.userId)

        console.log(`Usuário ${socket.userId} entrou na sala ${roomId}`)

        io.to(roomId).emit('user-list-update', Array.from(usersInRooms[roomId]))

        socket.emit('joined-room', { roomName: room.name, userId: socket.userId })
    });

    socket.on('leave-room', (roomId) => {
        socket.leave(roomId); 
        if (usersInRooms[roomId]) {
            usersInRooms[roomId].delete(socket.userId) 
            io.to(roomId).emit('user-list-update', Array.from(usersInRooms[roomId]))
        }
        console.log(`Usuário ${socket.userId} saiu da sala ${roomId}`)
    });

    socket.on('disconnect', () => {
        for (const roomId in usersInRooms) {
            if (usersInRooms[roomId].has(socket.userId)) {
                usersInRooms[roomId].delete(socket.userId);
                io.to(roomId).emit('user-list-update', Array.from(usersInRooms[roomId])); 
                break
            }
        }
        console.log(`Usuário desconectado: ${socket.userId}`);
    });
});


app.post('/api/test', (req, res) => {
    console.log(req.body)
    res.send(req.body)
  })

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Rodou: ${PORT}`)
})