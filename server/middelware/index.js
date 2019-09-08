const jwt = require('jsonwebtoken');
const { TokenVerify} = require('../helpers')
const { Todo , Project } = require('../models')
module.exports = {
    VerifyToken : (token)=>{
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            // console.log(decoded , ' di middelware')
            req.decoded = decoded
          } catch(err) {
            // err
          }
    },
    Authenthication : (req,res,next)=>{
        try {
         
          // console.log(req.headers)
          const decoded = TokenVerify(req.headers.token)
          let temp = {...decoded}
          if( typeof decoded.data == 'string'){
            decoded.data = {};
            decoded.data._id = temp.data;
          }
          // console.log(decoded , ' di middelware');
          req.decode = decoded;
          // console.log(req.decode);
          // req.decode.data._id = 
          // console.log(req.decode , ' ---------------------------<><><><><> di middelware auth ccccccccccccc')
          next()
        }catch (err){
          res.status(403).json({
            message : "anda tidak memilik akses"
          })
        }
    },
    Authorized : (req,res,next)=>{
      Todo.findOne({
        _id : req.params.id,
        User : req.decode.data._id
      })
      .then(user=>{
        console.log(' sampai di authorized middelware' , user , '<<<<<===========')
        if(user){
          next()
        }else {
          res.status(403).json({
            message : "You don't have access"
          })
        }
      })
      .catch(err=>{
        next(err)
      })
    },
    AuthorizedProject : (req,res,next) =>{
      Project.findOne({
        _id : req.params.id
      })
      .then(project=>{
        let kondisi = false
        project.memberUser.forEach(el=>{
          if(el == req.decode.data._id){
            kondisi = true
            next()
          }
          // console.log(el , ' DARI MIDDELLWARE !!!!')
        })
          if(!kondisi){
            res.status(401).json({
              message : "You don't have access HERE"
            })
          }
      })
      .catch(next)
    }
}