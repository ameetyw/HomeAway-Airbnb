import { storageService } from './async-storage.service';

export const robotService = {
    query,
    getById,
    save,
    remove,
    getNextRobotId,
    // getEmptyRobot,
};

const STORAGE_KEY = 'robots';

async function query(filterBy) {
    let robots = await storageService.query(STORAGE_KEY);
    if (filterBy) {
        //robots = robots.filter(...)
    }
    return robots;
}

function getById(robotId) {
    return storageService.get(STORAGE_KEY, robotId);
}

function remove(robotId) {
    return storageService.remove(STORAGE_KEY, robotId);
}

function save(robot) {
    if (robot._id) {
        return storageService.put(STORAGE_KEY, robot);
    } else {
        return storageService.post(STORAGE_KEY, robot);
    }
}

function getNextRobotId(robotId) {
    const robotIdx = gRobots.findIndex(robot => robot._id === robotId)
    let nextRobotIdx = robotIdx + 1
    if (nextRobotIdx === gRobots.length) nextRobotIdx = 0
    return gRobots[nextRobotIdx]._id
}

// function getEmptyRobot() {
//     return {
//         model: '',
//         type: '',
//         batteryStatus: 100
//     }
// }