import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from ".././components/Landing";
import { SignIn } from ".././components/SignIn";
import { SignUp } from ".././components/SignUp";
import { Dashboard } from ".././components/Dashboard";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export { Router };
