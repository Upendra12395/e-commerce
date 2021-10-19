const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.signIn = (req, res)=>{
    const {userName, contact, email, password} = req.body
    if(!userName || !contact || !email || !password){
        return res.status(500).json({message: "All fields required"})
    }
    User.findOne({email : email}).then((user)=>{
        if(user){
            return res.status(400).json({message: 'user allready registered'})
        }else{
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password, salt, (err, hash)=>{
                    if(err) throw err;
                    const newUser = new User({
                        userName : userName,
                        contact: contact,
                        email: email,
                        password : hash
                    })
                    newUser.save()
                    .then((user)=>{
                        res.status(200).json(user)
                    }).catch(err=>{
                        return res.status(500).json({message: err.message})
                    })
                })
            })
        }
    })
}

module.exports.logIn = (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(401).json({message: 'all fileds required'})
    }
    User.findOne({email: email}).then((user)=>{
        if(!user){
            return res.status(401).json({message: 'user does not registered'})
        }else{
            bcrypt.compare(password, user.password).then((isMatch)=>{
                if(!isMatch){
                    return res.status(401).json({message: "Email or password incorrect"})
                }else{
                    jwt.sign(
                        {id:user._id},
                        process.env.JWT_KEY,
                        {
                            expiresIn : 3600
                        },
                        (err, token)=>{
                            if(err) throw err;
                            return res.status(200).json({token : token})
                        }
                    )
                }
            })
        }
    })
}

module.exports.getUser = (req, res)=>{
    User.find()
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        return res.status(500).json({message : err.message})
    })
}