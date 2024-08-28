const jwt = require("jsonwebtoken");


const auth =  (req,res,next) =>{
  const token = req.headers.authorization;
  if(token){
    decoded = jwt.verify(token,"sunil");
    console.log(decoded);
  }

  next();
}

module.exports = {auth};