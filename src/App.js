import CrazyTable from './components/CrazyTable'
function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center my-5">CrazyPanda Table</h1>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <CrazyTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
