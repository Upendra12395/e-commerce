const express = require('express')
const Product = require('../models/product')
const bodyParser = require('body-parser')
const product = require('../models/product')

module.exports.getAll = async (req, res)=>{
    await Product.find()
    .then(product =>{
        res.status(200).json(product)
    })
    .catch(err => res.status(500).json({message: err.message}))
}

module.exports.addProduct = async (req, res)=>{
    const { name , quantity, category, price} = req.body
    if (!name || !quantity || !category || !price){
        return res.status(400).json({message: "All field required"})
    }

    const newProduct = new Product({
        name: name,
        quantity: quantity,
        category: category,
        price: price
    })
    await newProduct.save()
    .then(product=>{
        return res.status(201).json({message:"product save successfully"})
    })
    .catch(err =>{
        return res.status(500).json({message:err.message})
    })

}

module.exports.getOne = async (req,res)=>{
    const pid = req.params.id
    await Product.findById(pid)
    .then(product=>{
        return res.status(200).json(product)
    })
    .catch(err=>{
        return res.status(500).json({message: err.message})
    })
}

module.exports.updateOne = async (req,res)=>{
    const pid = req.params.id
    await Product.findByIdAndUpdate(pid, req.body, {useFindAndModify: false})
    .then((product)=>{
        res.status(200).json({message: "Product details updated successfully"})
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    })

}

module.exports.deleteOne = async (req, res)=>{
    const pid = req.params.id
    await Product.findByIdAndRemove(pid)
    .then(product=>{
        res.status(200).json({message: "Product deleted successfully"})
    })
    .catch(err =>{
        res.status(500).json({message: err.message})
    })
}

module.exports.getBill = async (req, res)=>{
    try{
        // const result = await Product.aggregate([{$match:{price:{$gt :10000}}}])
        // .skip(1)
        // .sort({price :1})
        // .limit(1)
        // .exec()
        
        // const result = await Product.find({price:{$gte : 10000}})
        // .sort({price :1})
        // .skip(1)          //not working
        // .limit(1)
        // .select({name: true})

        //const result = await Product.aggregate([{$project: {name : 1, category:1, total: {$add : ["$quantity", "$price"]}}}])
        //const result = await Product.aggregate([{$group :{_id: "$category", total : {$sum: "$price"}}}])
        //const result = await Product.aggregate([{$group : {_id: "$category", total:{$sum: "$quantity"}}}])
        const result = await Product.aggregate([{$project : {name : 1, category : 1, totalSize : {$sum : "$size"}}}])
        res.status(200).json(result)

        // var prod = 0
        // for(let i of result){
        //     prod += i['price'] * i['quantity']
        //     console.log(prod)
        // }
        // console.log(prod)

    }catch(err){
        console.log(err)
    }
}