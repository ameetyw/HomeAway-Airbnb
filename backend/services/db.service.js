const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger.service');

module.exports = {
    getCollection
};

const dbURL = 'mongodb+srv://myHomeAwayDB:PTqZcesylgwoL85f@myhomeaway.ta5wr.mongodb.net/myHomeAway?retryWrites=true&w=majority';
const dbName = 'myHomeAway';
let dbConn = null;

async function getCollection(collectionName) {
    try {
        const db = await _connect();
        const collection = await db.collection(collectionName);
        return collection;
    } catch (err) {
        logger.error('Failed to get Mongo collection', err);
        throw err;
    }
}

async function _connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        logger.error('Cannot Connect to DB', err);
        throw err;
    }
}