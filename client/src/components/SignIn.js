import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HeaderBar } from "./Header";
import { useState } from "react";
import { connect } from "react-redux";
import { LogIn } from "../utils/auth";
import { Navigate } from "react-router-dom";

const theme = createTheme();

function SignIn(props) {
    const { loggedIn, dispatch } = props;
    console.log(loggedIn);
    const [state, setState] = useState({
        password: "",
        email: ""
    });
    const { password, email } = state;
    const handleSubmit = function (event) {
        event.preventDefault();
        dispatch(LogIn(state));
    };
    const handleChange = function (event) {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    if (loggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, overflowX: "hidden" }} margin="2% 5%">
                <HeaderBar />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                value={email}
                                onChange={handleChange}
                                id="email"
                                label="Email Address"
                                type="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={password}
                                onChange={handleChange}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return { loggedIn: loggedIn };
}

const ConnectedSignIn = connect(mapStateToProps)(SignIn);

export { ConnectedSignIn as SignIn };
