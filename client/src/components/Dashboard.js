import { HeaderBar } from "./Header";
import { connect } from "react-redux";
import { Typography, Box } from "@mui/material";
import { LockRounded } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

function Dashboard(props) {
    const { loggedIn } = props;
    if (!loggedIn) {
        return <Navigate to="/signin" />;
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowX: "hidden",
                margin: "2% 5%"
            }}
        >
            <HeaderBar />
            <Box sx={{ textAlign: "center", mt: "2%" }}>
                <LockRounded />
                <Typography variant="h3">This is protected page</Typography>
            </Box>
        </Box>
    );
}

function mapStateToProps(state) {
    const { loggedIn } = state;
    return { loggedIn: loggedIn };
}

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

export { ConnectedDashboard as Dashboard };
