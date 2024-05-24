module.exports = {
  ensureAuth: (req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg','You need to login')
    res.redirect('/auth/login')
  }
}
