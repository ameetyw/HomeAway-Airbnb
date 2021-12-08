import { httpService } from './http.service';
import { showErrorMsg } from './event-bus.service';

export const stayService = {
    query,
    getById,
};

async function query(filterBy = {}) {
    try {
        return await httpService.get('stay', filterBy);
    } catch (err) {
        showErrorMsg(`Oops... Something went wrong!\n(had a ${err.message.toLowerCase()})`);
    }
}

async function getById(stayId) {
    try {
        return await httpService.get(`stay/${stayId}`);
    } catch (err) {
        if (err.response.status === 404) throw new Error('This listing cannot be found');
        showErrorMsg(`Oops... Something went wrong!\n(had a ${err.message.toLowerCase()})`);
    }
}