const mongoose = require('mongoose');

const subdomainSchema = new mongoose.Schema({
    domainName: {
        type: String,
        trim: true,
        required: true
    },
    subdomains: {
        type: String,
        trim:true,
    },
    newSubdomains: {
        type: String,
        trim:true,
    }
})

const Subdomain = mongoose.model('subdomains',subdomainSchema);

module.exports = Subdomain;