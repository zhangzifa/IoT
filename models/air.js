const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airSchema = new Schema({
    sensorId: { type: Number, default: 0 },
    updated: { type: Date, default: Date.now },
    count: { type: Number, default: 0 },
    sum: { type: Number, default: 0 },
    pm25: [ {} ],
    probe: String,
    location: []
});

airSchema.index({updated:-1, sensorId:1}, {unique: true}); // schema level
airSchema.index({location: '2dsphere'});

const ModelClass = mongoose.model('air', airSchema);

module.exports = ModelClass;