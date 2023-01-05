import './App.css'
import Table from './modules/Table';
import Register from './modules/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <h1>New Jersey Driving Licence Appointment Tracker</h1>
      </header>
      <Routes>
          <Route path='/' element={<Table />} />
          <Route path='/register/:id' element={<Register />}/>
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
