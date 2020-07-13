const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgWaterPerWeekSchema = new Schema({
    week: {
        type: Number,
        require: true
    },
    ltr:{
        type: Number,
        required: true
    }
});

const caloryBurntPerWeekSchema = new Schema({
    week: {
        type: Number,
        require: true
    },
    cals:{
        type: Number,
        required: true
    }
});

const userFitnessDataSchema = new Schema({
    userName: {
        type: String,
        require: true,
        ref: 'UserInfo' //Relation created to the UserInfo Model
    },
    waterConsumption:{
        type: [avgWaterPerWeekSchema],
        required: true
    },
    caloriesBurnt:{
        type: [caloryBurntPerWeekSchema],
        required: true
    }
});

module.exports = mongoose.model('UserFitnessData', userFitnessDataSchema);