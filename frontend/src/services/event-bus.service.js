function on(eventName, listener) {
    const callListener = ({ detail }) => { listener(detail); };
    window.addEventListener(eventName, callListener);
    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBusService = { on, emit };

export function showUserMsg(input, type = '') {
    eventBusService.emit('show-user-msg', { input, type });
}
export function showSuccessMsg(input) {
    showUserMsg(input, 'success');
}
export function showErrorMsg(input) {
    showUserMsg(input, 'error');
}

/* Listening Component...
    import {eventBusService} from '.../event-bus-service'
    eventBusService.on('some-event', (dataFromEvent) => {
        do something with dataFromEvent
    })

   Receiving Component...
    eventBusService.emit('some-event', data)
*/