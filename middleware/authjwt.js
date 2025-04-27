const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config')
const User = require('../models/User')
const { Role } = require('../models/Role')


const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        console.log(token)

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded.id 

        const user = await User.findById(req.userId, {password: 0})

        console.log(user)

        if (!user) {
            return res.status(404).json({message: "No user found"})
        }

        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"})
    }
}

const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: { $in: user.roles } })
    console.log(roles)
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderador") {
            next()
            return
        }
    }
    return res.status(403).json({message: "Require Moderator role"}) 
}

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return
        }
    }
    return res.status(403).json({message: "Require Admin role"}) 
}

module.exports = {
    verifyToken,
    isModerator,
    isAdmin
}