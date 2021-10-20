const jwt = require('jsonwebtoken');
const User = require('../models/user')


module.exports.userAuth = (req, res, next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({message:'You must be logged In'})
    }else{
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_KEY, (err, payload)=>{
            if(err){
                return res.status(401).json({error : err.message})
            }else{
                const _id = payload._id
                User.findById(_id).then((userData)=>{
                    req.user = userData
                    next();
                })
            }
        })
    }
}