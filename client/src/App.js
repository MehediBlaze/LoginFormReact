import { Router } from "./routes/Routes";
import "./App.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
    return (
        <div className="App">
            <Router />
        </div>
    );
}

export default App;
