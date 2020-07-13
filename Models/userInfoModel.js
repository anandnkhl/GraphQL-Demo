const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    emailID:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserInfo', userInfoSchema)