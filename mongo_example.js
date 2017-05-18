"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI,(err, db) => {
  if(err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //lets get all the tweets

  db.collection("tweets").find().toArray((err, results) => {
    //LAZY ERROR HANDLING
    if(err) throw err;

    //WE CAN ITERATE ON

    console.log("results array: ", results);

  db.close();
 });

});