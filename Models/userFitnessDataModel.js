const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avgWaterPerWeekSchema = new Schema({
    week: {
        type: Number,
    },
    ltr:{
        type: Number,
    }
});

const caloryBurntPerWeekSchema = new Schema({
    week: {
        type: Number,
    },
    cals:{
        type: Number,
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
    },
    caloriesBurnt:{
        type: [caloryBurntPerWeekSchema],
    }
});

module.exports = mongoose.model('UserFitnessData', userFitnessDataSchema);