const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../services/logger.service');
// const asyncLocalStorage = require('../../services/als.service');

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy);
        const collection = await dbService.getCollection('stays');
        const stays = await collection.find({}).toArray();
        // const stays = await collection.find(criteria).toArray();
        return stays;
    } catch (err) {
        logger.error('cannot get stays', err);
        throw err;
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stays');
        const stay = await collection.findOne({ '_id': ObjectId(stayId) });
        return stay;
    } catch (err) {
        logger.error('cannot get stay (id:', stayId, ')', err);
        throw err;
    }
}

async function save(stay) {
    try {
        const collection = await dbService.getCollection('stays');
        if (stay._id) {
            console.log('stay._id in update stay:', stay._id);
            await collection.updateOne({ '_id': stay._id }, { $set: { ...stay } });
        } else {
            const { insertedId } = await collection.insertOne(stay);
            stay._id = insertedId;
        }
        return stay;
    } catch (err) {
        logger.error('cannot save stay', err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.type && filterBy.type.length) {
        const typeCriteria = filterBy.type.map(type => new RegExp(type, 'i'));
        criteria.type = { $in: typeCriteria };
    }
    if (filterBy.amenities && filterBy.amenities.length) {
        const amenitiesCriteria = filterBy.amenities.map(amenity => new RegExp(amenity, 'i'));
        criteria['amenities.amenity'] = { $all: amenitiesCriteria };
    }
    return criteria;
}

module.exports = {
    query,
    getById,
    save,
};
