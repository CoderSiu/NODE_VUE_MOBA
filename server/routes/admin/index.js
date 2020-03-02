module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const router = express.Router({
    mergeParams: true
  })
  const authMiddleware = require('../../middleware/auth')
  const resouceMiddleware = require('../../middleware/resource')
  router.post('/',authMiddleware(), async (req, res) => {
    console.log(req.Model)
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.put('/:id',authMiddleware(), async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
  router.get('/',authMiddleware() ,async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'  
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  router.get('/:id', authMiddleware() ,async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  router.delete('/:id',authMiddleware() , async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({message:"success"})
  })
  app.use('/admin/api/rest/:resource',authMiddleware() , resouceMiddleware(),router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload',upload.single('file'),(req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login',async (req,res) => {
    const { username,password } = req.body
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user,422,'找不到用户名')
    const pass = require('bcrypt').compareSync(password,user.password)
    assert(pass,422,'密码错误')
    const token = jwt.sign({id:user._id},app.get('secretKey'))
    res.send({token})
  })

  app.use( async (err,req,res,next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}