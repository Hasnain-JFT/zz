const mongoose = require('mongoose');
const uuid = require('node-uuid');
const Schema = mongoose.Schema;

let agencySchema = new Schema({
    agencyId : {type : String, required : true},
    name : {type : String, required : true},
    address1 : {type : String, required : true},
    address2 : {type : String},
    state : {type : String, required : true},
    city : {type : String, required : true},
    phone : { type: Number, length : 11, required: true },
})

module.exports = mongoose.model('agency', agencySchema)



