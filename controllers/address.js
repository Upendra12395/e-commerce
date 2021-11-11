const Address = require('../models/address')

module.exports.addAddress = (req, res) =>{
    const {address1, address2, landmark, city, state, country, pincode} = req.body
    const userId = req.user._id
    if(!address1 || !address2 || !city || !state || !pincode){
        res.status(400).json({message : 'All fields required'})
    }else{
        const newAddress = new Address({
            address1 : address1,
            address2 : address2,
            landmark : landmark,
            city : city,
            state : state,
            country: country,
            pincode : pincode,
            user : userId
        })
        newAddress.save()
        .then(()=>{
            res.status(200).json({message : 'Address saved successfully'})
        })
        .catch(err =>{
            res.status(500).json({message : err.message})
        })
    }
}

module.exports.updateOne = (req, res) =>{
    const addressId = req.params._id
    const userId = req.user._id
    Address.findOne({_id : addressId, user : userId}).then((address)=>{
        if(!address){
            res.status(401).json({message : 'You are not authorized for this action'})
        }else{
            Address.findByIdAndUpdate(addressId, req.body, {useFindAndModify : false})
            .then(()=>{
                res.status(200).json({message : 'Address updated successfully'})
            })
            .catch(err =>{
                res.status(500).json({message : err.message})
            })
        }
    })
}

module.exports.deleteOne = (req, res)=>{

}

module.exports.showAll = (req, res)=>{
    
}