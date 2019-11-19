const express = require("express");
const Room = require("./model");
const { Router } = express;
const auth = require("../auth/middleware");

function roomFactory(stream) {
  const router = new Router();

  router.post("/room", async (req, res, next) => {
    const room = await Room.create(req.body);
    const action = { type: "ROOM", payload: room };
    const data = JSON.stringify(action);
    stream.send(data);
    res.send(room);
  });

  return router;
}

module.exports = roomFactory;
