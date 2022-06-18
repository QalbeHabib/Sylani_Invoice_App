
const logOut = (obj) => {
    return {
        type: "LOG_OUT",
        payload: obj
    }
}

export default {
    logOut
}