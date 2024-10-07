const Room = require('../models/roomModel')

exports.createRoom = async (req, res) => {
    const { name, description, capacity } = req.body
  
    try {
      const newRoom = new Room({
        name,
        description,
        capacity,
      })
  
      await newRoom.save()
  
      res.status(201).json(newRoom)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Erro ao criar a sala' })
    }
}

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
    res.json(rooms)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erro no servidor')
  }
}


exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({ msg: 'Sala não encontrada' })
    }
    res.json(room)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erro no servidor')
  }
}

exports.updateRoom = async (req, res) => {
  const { name, description } = req.body

  try {
    const room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({ msg: 'Sala não encontrada' })
    }

    room.name = name || room.name
    room.description = description || room.description
    await room.save()

    res.json(room)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Erro no servidor')
  }
}

exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        if (!room) {
        return res.status(404).json({ msg: 'Sala não encontrada' })
        }

        
        await Room.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Sala removida' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Erro no servidor')
    }
}

exports.joinRoom = async (req, res) => {
    const { roomId } = req.body
    console.log('roomId:', roomId)
  
    try {
      const room = await Room.findOne({ jd: roomId })
      console.log('Room found:', room)
  
      if (!room) {
        return res.status(404).json({ msg: 'Sala não encontrada' })
      }
  
      res.json({ msg: 'Você entrou na sala com sucesso', room })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Erro ao entrar na sala')
    }
}
