const storageAvailable = () => {
    try {
        var storage = window['localStorage'],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

export const testLocalStorage = () => {
    if (!storageAvailable()) {
        alert('Kein Zugriff auf den lokalen Speicher. Ohne lokalen Speicher funktioniert die App nicht.');
        return false;
    }
    return true;
}

export const set = (key, value) => localStorage.setItem(key, value);
export const get = (key) => localStorage.getItem(key);
