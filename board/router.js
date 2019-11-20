const { Router } = require("express");
const router = new Router();
const Board = require("./model");

router.post("/:roomId/board", (req, res, next) => {
  const board = {
    roomId: req.params.roomId
  };

  Board.create(board)
    .then(board => res.json(board))
    .catch(next);
});

router.get("/:roomId/board", (req, res, next) => {
  Board.findOne({
    where: {
      roomId: parseInt(req.params.roomId)
    }
  })
    .then(board => {
      res.json(board);
    })
    .catch(next);
});

module.exports = router;
