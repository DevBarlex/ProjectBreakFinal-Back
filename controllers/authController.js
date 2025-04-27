const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config')
const  { Role }  = require('../models/Role')

const register = async (req, res) => {
    const {username, email, password, roles} = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: 'user'})
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
    console.log(savedUser)
    
    const token = jwt.sign({id: savedUser._id}, jwtSecret, {
        expiresIn: 86400 
    })

    res.status(200).json({token})
}

const login = async (req, res) => {

    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) return res.status(400).json({message: "User not found"})
    
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})

    const token = jwt.sign({id: userFound._id}, jwtSecret, {
        expiresIn: 86400
    })

    console.log(userFound)

    res.json(({token}))
}


module.exports = {
    register,
    login
}