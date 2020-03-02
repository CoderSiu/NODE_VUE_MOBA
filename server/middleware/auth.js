
module.exports = options => {
  const AdminUser = require('../models/AdminUser')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  return async (req,res,next) => {
    
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token,401,'请重新登录')
    const { id } = jwt.verify(token,req.app.get('secretKey'))
    req.user = AdminUser.findById({id})
    assert(req.user,401,'请重新登录')
    next()
  }
}