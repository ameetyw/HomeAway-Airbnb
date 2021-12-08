const logger = require('../../services/logger.service');
// const userService = require('../user/user.service')
// const socketService = require('../../services/socket.service')
const stayService = require('./stay.service');

async function getStays(req, res) {
    try {
        const filterBy = req.query;
        const stays = await stayService.query(filterBy);
        res.send(stays);
    } catch (err) {
        res.status(500).send('Failed to get stays' + err);
    }
}

async function getById(req, res) {
    const { stayId } = req.params;
    try {
        const stay = await stayService.getById(stayId);
        if (!stay) res.status(404).send('The listing cannot be found');
        else res.send(stay);
    } catch (err) {
        res.status(500).send('Failed to get stay. ' + err);
    }
}

async function saveStay(req, res) {
    try {
        const stay = req.body;
        // stay.byUserId = req.session.user._id
        const savedStay = await stayService.save(stay);

        // console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({type: 'stay-added', data: stay, userId: stay.byUserId})
        // socketService.emitToUser({type: 'stay-about-you', data: stay, userId: stay.aboutUserId})
        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})
        res.send(savedStay);
    } catch (err) {
        logger.error('Failed to save stay', err);
        res.status(500).send({ err: 'Failed to save stay' });
    }
}

// async function removeStay(req, res) {
//     try {
//         await stayService.remove(req.params.id)
//         res.send({ msg: 'Deleted successfully' })
//     } catch (err) {
//         logger.error('Failed to delete stay', err)
//         res.status(500).send({ err: 'Failed to delete stay' })
//     }
// }

module.exports = {
    getStays,
    getById,
    saveStay,
    // removeStay,
};