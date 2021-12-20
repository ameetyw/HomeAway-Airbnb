export function importImgs(requireCtx) {
    let images = {};
    requireCtx.keys().forEach(item => { images[item.match(/[\w._-]+(?=[.])/)[0]] = requireCtx(item); });
    return images;
}

export function isContentOverflown(el) {
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = el;
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
}

export function loadScript(elementId, scriptSrc, options) {
    const existingScript = document.getElementById(elementId);
    if (!existingScript) {
        const script = document.createElement('script');
        // script.type = 'text/javascript';
        script.src = scriptSrc;
        script.id = elementId;
        if (options && options.async) script.async = options.async;
        if (options && options.defer) script.defer = options.defer;
        document.body.appendChild(script);
        script.onload = () => {
            if (options && options.callback) options.callback();
        };
        script.onerror = () => {
            console.log(`${elementId} script load error`);;
        };
    } else if (existingScript && options && options.callback) {
        options.callback();
    }
}

export function makeId(length = 8) {
    let id = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        id += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return id;
}





export function isEmptyObj(obj) {
    return !Object.keys(obj).length;
}