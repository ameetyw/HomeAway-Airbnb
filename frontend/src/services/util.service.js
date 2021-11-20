export function makeId(length = 8) {
    let id = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        id += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return id;
}

export function importImgs(requireCtx) {
    let images = {};
    requireCtx.keys().forEach(item => { images[item.match(/[\w\._-]+(?=[\.])/)[0]] = requireCtx(item); });
    return images;
}