import { makeId } from "./util.service";

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    // postMany
};

function query(entityType) {
    const entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return Promise.resolve(entities);
}

async function get(entityType, entityId) {
    const entities = await query(entityType);
    return entities.find(entity => entity._id === entityId);
}

async function post(entityType, newEntity) {
    newEntity._id = makeId();
    const entities = await query(entityType);
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
}

async function put(entityType, updatedEntity) {
    const entities = await query(entityType);
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
}

async function remove(entityType, entityId) {
    const entities = await query(entityType);
    const idx = entities.findIndex(entity => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

// function postMany(entityType, newEntities) {
//     return query(entityType)
//         .then(entities => {
//             newEntities = newEntities.map(entity => ({ ...entity, _id: makeId() }));
//             entities.push(...newEntities);
//             _save(entityType, entities);
//             return entities;
//         });
// }