const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://sunilchaudhary:sunilchaudhary@cluster0.pf95sdj.mongodb.net/schoolnet",
  {useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable buffering
}
);

module.exports = { connection };
 