const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  UserWin: { type: Number },
  UserLose: { type: Number },
  computerWin: { type: Number },
  computerLose: { type: Number },
  draw: {type:Number},
});

const ScoreModel = mongoose.model("score",scoreSchema);
module.exports={ScoreModel};
