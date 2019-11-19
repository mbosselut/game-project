const express = require("express");
const Room = require("./model");
const { Router } = express;
const { toData } = require('../auth/jwt');
const auth = require("../auth/middleware");
const User = require('../user/model')

function roomFactory(stream) {
  const router = new Router();

  router.post("/room", async (req, res, next) => {
    const room = await Room.create(req.body);
    const action = { type: "ROOM", payload: room };
    const data = JSON.stringify(action);
    stream.send(data);
    res.send(room);
  });

  router.patch('/join/:name', auth, async (req, res, next) => {
    let data
    const auth = req.headers.authorization && req.headers.authorization.split(' ');
    if (auth && auth[0] === 'Bearer' && auth[1]) {
      data = toData(auth[1])
    }
    console.log('data is : ', data)
    const user = await User.findByPk(data.userId)
    const { name } = req.params;
    const room = await Room.findOne({where: {name} })
  
    const updatedUser = await user.update({roomId: room.id})
  
    const rooms = await Room.findAll({include: [User]})
  
    const action = {type: 'ROOMS', payload: rooms};
  
    const string = JSON.stringify(action);
  
    stream.send(string);
  
    res.send(updatedUser)
    })

  return router;
}

module.exports = roomFactory;
