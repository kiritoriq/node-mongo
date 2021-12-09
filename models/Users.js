const { mongoose } = require('../db');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: String,
        required: false
    },
    displayPicture: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const Users = mongoose.model('Users', usersSchema);
module.exports = Users