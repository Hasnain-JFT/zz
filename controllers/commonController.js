const jwt  = require('jsonwebtoken');
require('dotenv').config();
const Agency = require('../models/agency');
const Client = require('../models/client');
const uuid = require('node-uuid');
module.exports = {
    getToken : async function(req,res) {
        let query = req.query;
        let token = jwt.sign({id : query.id}, process.env.SECRETKEY);
        return res.json({message : `Here's your token`, token : token, status : true});
    },
    addData : async function(req,res) {
        let postData = req.body;
        if(!postData.name || !postData.address1 || !postData.city || !postData.phone || !postData.state || !postData.client){
            return res.json({message : 'please fill all mandatory details'})
        }
        postData.agency,client = {};
        if(postData.phone.toString().length > 10){
            return res.json({message : 'phone number not valid'});
        }
        let newAgency = new Agency({
            agencyId : uuid.v4(),
            name : postData.name,
            address1 : postData.address1,
            address2 : postData.address2 ? postData.address2 : "",
            city : postData.city,
            state : postData.state,
            phone : Number(postData.phone),
        })
        if(postData.client && postData.client.length > 0){
            let newClients = postData.client.map(data => {
                if(!data.name || !data.email || !data.phone || !data.totalBill){
                    return res.json({message : 'Please fill all mandatory fields'});
                }
                return {
                    clientId : uuid.v4(),
                    agencyId : newAgency.agencyId,
                    phone : data.phone,
                    email : data.email,
                    name : data.name,
                    totalBill : data.totalBill
                }
            })
                for(data of newClients){
                let newClientData = new Client(data);
                await newClientData.save();
            };
        }
        await newAgency.save();
        return res.json({message : 'saved successfully'});
    },
    updateClient : async function(req,res) {
        let user = req.user;
            await Client.findOneAndUpdate({clientId : user.clientId}, req.body );
            return res.json({message : 'Data updated successfully'})
    },
    getData : async function(req,res){
        let foundClient = [];
        let data = {}
        let query = req.query;
        if(!query){
            return res.json({message : 'Id not found'});
        }
        let foundAgency = await Agency.findOne({agencyId : query.id});
        console.log("dajk", foundAgency.agencyId);
        if(foundAgency){
            foundClient = await Client.find({agencyId : foundAgency.agencyId}).limit(3);
            console.log("fskfjks", foundClient);
            if(foundClient){
                data = {
                    agencyName : foundAgency.name,
                    clientData : foundClient.map((val) => {
                        return {
                            name : val.name,
                            totalBill : val.totalBill,
                        }
                    })
                }
                return res.json({message : 'Data Found', data : data})
            } else {
                data.agencyName = foundAgency.name;
                return res.json({message : 'Agency with no clients' , data})
            }
        } else {
            return res.json({message : 'agency not found'})
        }
    },
    home : async function(req,res){
        return res.json({message : 'go to any other route', status : true});
    },
    page404 : function(req, res){
        res.status(404).send('what???, Page not found with status 404');
      },
}