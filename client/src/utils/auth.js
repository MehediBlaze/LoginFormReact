import axios from "axios";

const environment = process.env["REACT_APP_ENVIRONMENT"];
const baseURL =
    environment === "server"
        ? "https://login-form-reactjs.herokuapp.com"
        : "http://localhost:5000";

const IsLoggedIn = () => {
    return (dispatch) => {
        const options = {
            url: `${baseURL}/auth/loggedin`,
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
            url: `${baseURL}/auth/login`,
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
            url: `${baseURL}/auth`,
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
            url: `${baseURL}/auth/logout`,
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
