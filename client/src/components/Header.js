import { connect } from "react-redux";
import { Toolbar, AppBar, Box, Typography, Button } from "@mui/material";
import { LogOut } from "../utils/auth";

function HeaderBar(props) {
    const { loggedIn, dispatch } = props;

    const handleLogout = function () {
        dispatch(LogOut());
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        SIGN UP|IN
                    </Typography>
                    {loggedIn === false && (
                        <>
                            <Button color="inherit" href="/signin">
                                Sign In
                            </Button>
                            <Button color="inherit" href="/signup">
                                Sign Up
                            </Button>
                        </>
                    )}
                    {loggedIn === true && (
                        <Button color="inherit" onClick={handleLogout}>
                            Log Out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return { loggedIn: loggedIn };
}

const ConnectedHeaderBar = connect(mapStateToProps)(HeaderBar);

export { ConnectedHeaderBar as HeaderBar };
