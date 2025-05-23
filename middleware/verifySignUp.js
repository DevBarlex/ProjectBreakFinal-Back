const { ROLES } = require('../models/Role')
const User = require('../models/User')

const checkDuplicateUser = async (req, res, next) => {
    console.log(req.body);

    const user = await User.findOne({username: req.body.username})

    if (user) return res.status(400).json({message: 'The user already exists'})
    

    const email = await User.findOne({email: req.body.email})

    if (email) return res.status(400).json({message: 'The email already exists'})
    
    next()
}
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`
                })
            }
        }
    }
    next()
}


module.exports = {
    checkDuplicateUser,
    checkRolesExisted
}