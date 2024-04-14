import 'bootstrap-dark/package.json';
import './App.css';
import Home from './screens/Home';
import Login from './screens/login';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './screens/Signup.js';
import { CardProvider } from './components/ContextReducer.js';
import MyOrders from './screens/MyOrder.js';
function App() {
  return (
    <CardProvider>

      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/CreateUser" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrders/>} />
          </Routes>
        </div>
      </Router>

    </CardProvider>

  );
}

export default App;
