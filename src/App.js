import './App.css';
import RegisterPage from './registerPage.js';
import Chat from './chat'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div>
    <Router>
      <Routes>
          <Route path="/">
          </Route>
          <Route path="/register" component={RegisterPage} />
          <Route path="/chat" component={Chat} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
