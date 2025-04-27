const mongoose = require('mongoose');
const { Schema } = mongoose; 

const ROLES = ['user', 'admin', 'moderador']

const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
})

const Role = mongoose.model('Role', roleSchema);

module.exports = {
    Role,
    ROLES
}




