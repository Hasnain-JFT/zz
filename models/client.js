const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientSchema = new Schema({
    clientId : {type : String},
    agencyId : {type : String},
    name : {type : String},
    email : {type : String},
    phone : { type: Number},
    totalBill : {type : Number},
})



module.exports =  mongoose.model('client', clientSchema)

