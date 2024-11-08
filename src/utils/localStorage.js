export const persistInLocalStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify({ ...value }))
}

export const clearLocalStorage = (key) => {
    window.localStorage.removeItem(key)
}

export const getItemLocalStorage = (key) => {
    return window.localStorage.getItem(key)
}