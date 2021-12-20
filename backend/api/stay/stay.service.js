const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../services/logger.service');
// const asyncLocalStorage = require('../../services/als.service');

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy);
        const collection = await dbService.getCollection('stays');
        const stays = await collection.find(criteria).toArray();
        // let stays = await collection.aggregate([
        //     {
        //         $match: criteria
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'byUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     },
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             localField: 'aboutUserId',
        //             from: 'user',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     },
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        // stays = stays.map(stay => {
        //     review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
        //     review.aboutUser = { _id: review.aboutUser._id, fullname: review.aboutUser.fullname }
        //     delete review.byUserId
        //     delete review.aboutUserId
        //     return review
        // })
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
        // peek only updatable fields!
        // const reviewToAdd = {
        //     byUserId: ObjectId(review.byUserId),
        //     aboutUserId: ObjectId(review.aboutUserId),
        //     txt: review.txt
        // };
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

// async function remove(reviewId) {
//     try {
//         const store = asyncLocalStorage.getStore()
//         const { userId, isAdmin } = store
//         const collection = await dbService.getCollection('review')
//         // remove only if user is owner/admin
//         const criteria = { _id: ObjectId(reviewId) }
//         if (!isAdmin) criteria.byUserId = ObjectId(userId)
//         await collection.deleteOne(criteria)
//     } catch (err) {
//         logger.error(`cannot remove review ${reviewId}`, err)
//         throw err
//     }
// }


function _buildCriteria(filterBy) {
    // filterBy = {
    //     type: ['1-entire', '2-private','3-hotel','4-shared'],
    //     minPrice, 
    //     maxPrice,
    //     superhost: true,
    //     amenities: ['dryer','wifi','dedicated workspace'],
    //     propertyType: ['loft','condo','rental unit'],
    //     unique: ['tree house','camper/RV','tent','tiny house'],
    // }
    const criteria = {};
    if (filterBy.type && filterBy.type.length) {
        const typeCriteria = filterBy.type.map(type => new RegExp(type, 'i'));
        criteria.type = { $in: typeCriteria };
    }
    if (filterBy.amenities && filterBy.amenities.length) {
        const amenitiesCriteria = filterBy.amenities.map(amenity => new RegExp(amenity, 'i'));
        criteria['amenities.amenity'] = { $all: amenitiesCriteria };
    }
    // console.log(criteria)
    return criteria;
    //to build criteria..
    //type:   specific regex .find({type: { $regex: /private/, $options: 'i'}})
    // get stays that are private or shared- 
    // .find({type: { $in: [/private/i, /shared/i]} })
    // has both pool + shampoo:
    // .find({ 'amenities.amenity': { $all: [/shampoo/i, /pool/i] } });
    // .find({'type': { '$in': [ /entire place/i ]}, 
    //        'amenities.amenity':{'$all':[/wifi/i, /smoke alarm/i]}})
}

module.exports = {
    query,
    getById,
    save,
    // remove,
};
