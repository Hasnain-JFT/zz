const jwt = require('jsonwebtoken');
require('dotenv').config();
const client = require('../models/client');
module.exports = {
    authToken : async function(req,res, next) {
        let token = req.header('authorization');
        jwt.verify(token, process.env.SECRETKEY, async (err, data) => {
            if(err) {
                console.log("Error in middleware",err);
            }
            else {
                if(data  && data.id){
                    const foundUser = await client.findOne({clientId : data.id});
                    if(foundUser){
                        req.user = foundUser;
                       return next();
                    } else {
                        return res.redirect('/');
                    }
                } else {
                   return res.redirect('/');
                }
            }
        })
   },
}