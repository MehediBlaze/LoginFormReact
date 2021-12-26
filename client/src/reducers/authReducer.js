function AuthReducer(initialState = { loggedIn: undefined }, action) {
    switch (action.type) {
        case "LOG_IN":
            return { loggedIn: true };
        case "LOG_OUT":
            return { loggedIn: false };
        default:
            return initialState;
    }
}

export { AuthReducer };
