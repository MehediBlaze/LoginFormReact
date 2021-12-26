import axios from "axios";

const IsLoggedIn = () => {
    return (dispatch) => {
        const options = {
            url: "http://localhost:5000/auth/loggedin",
            method: "GET"
        };
        axios(options).then((resp) => {
            dispatch({ type: resp.data ? "LOG_IN" : "LOG_OUT" });
        });
    };
};

const LogIn = (data) => {
    return function (dispatch) {
        const options = {
            url: "http://localhost:5000/auth/login",
            method: "POST",
            data: data
        };
        axios(options)
            .then((resp) => {
                dispatch({ type: "LOG_IN" });
            })
            .catch(console.error);
    };
};

const Register = (data) => {
    return function (dispatch) {
        const options = {
            url: "http://localhost:5000/auth",
            method: "POST",
            data: data
        };
        axios(options)
            .then(() => {
                dispatch({ type: "LOG_IN" });
            })
            .catch(console.error);
    };
};

const LogOut = () => {
    return (dispatch) => {
        const options = {
            url: "http://localhost:5000/auth/logout",
            method: "GET"
        };
        axios(options)
            .then(() => {
                dispatch({ type: "LOG_OUT" });
            })
            .catch(console.error);
    };
};

export { IsLoggedIn, LogIn, Register, LogOut };
