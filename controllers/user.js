const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

module.exports.signIn = (req, res)=>{
    const { userName, email, contact, password} = req.body
    if(!userName || !email || !contact || !password){
        return res.status(400).json({message : "all fields required"})
    }
    User.findOne({email:email}).then((user)=>{
        if(user){
            return res.status(400).json({message: 'user already registered'})
        }else{
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password, salt, (err, hash)=>{
                    if(err) throw err;
                    const newUser = new User({
                        userName:userName,
                        email:email,
                        contact: contact,
                        password : hash
                    })
                    newUser.save().then((user)=>{
                        res.status(200).json({message:'user registered successfully', user: user})
                    })
                    .catch(err =>{
                        return res.status(500).json({message:err.message})
                    })
                })
            })
        }
    })
}


module.exports.logIn = (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "all fields required"})
    }else{
        User.findOne({email: email}).then((user)=>{
            if(!user){
                return res.status(400).json({message : 'user does not exist'})
            }else{
                bcrypt.compare(password, user.password).then((isMatch)=>{
                    if(!isMatch){
                        return res.status(401).json({message: "Ivalid email or password"})
                    }else{
                        jwt.sign(
                            {id : user._id},
                            process.env.JWT_KEY,
                            {
                                expiresIn : 3600
                            },
                            (err, token)=>{
                                if(err) throw err;
                                res.json({token: token})
                            }
                        )
                    }
                })
            }
        })
    }
}

module.exports.getUser = (req, res)=>{
    User.find().then((user)=>{
        res.status(200).json(user)
    })
    .catch(err =>{
        return res.status(500).json({error : err.message})
    })
}