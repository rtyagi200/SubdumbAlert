const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    domainName: {
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: String,
        trim:true,
        required: true,
    },
    username: {
        type: String,
        trim:true,
        required: true
    }
})

const Domain = mongoose.model('domains',domainSchema);

module.exports = Domain;