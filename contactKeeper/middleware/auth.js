const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req,res,next)=>{
  const token = req.header('x-auth-token');

  //check if token
  if(!token){
    return res.status(401).json({msg:"No token, authorization denied"});
  }
  try {
    const decoded = await jwt.verify(token,config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({msg:"Token is not valid"})
  }
}

module.exports = auth;
