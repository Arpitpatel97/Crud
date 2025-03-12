const { MongoClient } = require("mongodb")

let dbconnectionurl="mongodb://127.0.0.1:27017"
const client = new MongoClient(dbconnectionurl);

let dbConnection=async()=>{
    await client.connect()
   let db=  client.db("mongodbProject")
   return db;
}

module.exports={dbConnection}