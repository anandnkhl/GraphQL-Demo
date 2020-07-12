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

const userFitnessDataSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    waterConsumption:{
        type: [avgWaterPerWeekSchema],
        required: true
    }
});

module.exports = mongoose.model('UserFitnessData', userFitnessDataSchema);