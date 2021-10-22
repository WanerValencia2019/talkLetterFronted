import "./css/App.css";
import Toast from './components/Toast';

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
function App() {
  return (
    <Router>
      <Toast /> 
      <AppRoutes />
    </Router>
  );
}

export default App;
