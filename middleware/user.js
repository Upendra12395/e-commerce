const jwt = require('jsonwebtoken');
const User = require('../models/user')


module.exports.userAuth = (req, res, next)=>{
    const { authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({message : "you must have to log in"})
    }else{
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_KEY, (err, payload)=>{
            if(err){
                return res.status(403).json({message: err})
            }else{
                const _id = payload.id
                User.findById(_id).then((userData)=>{
                    req.user = userData
                    next();
                })
            }
        })
    }

}