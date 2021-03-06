"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      //simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      //});
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      //simulateDelay(() => {
        const sortNewestFirst = (a, b) => {return b.created_at - a.created_at;}
        db.collection("tweets").find({}).toArray((err, results) => {
          results = results.sort(sortNewestFirst);
          callback(null, results);
      //});
        });
      //});
    }

  };
}
