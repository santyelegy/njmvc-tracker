import './App.css';
import Table from './modules/Table';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a>New Jersey Driving Licence Appointment Tracker</a>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
      </header>
      <div>
        <Table />
      </div>
    </div>
  );
}

export default App;
