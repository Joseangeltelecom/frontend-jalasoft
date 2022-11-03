import "./App.css";
import ErrorView from "./Components/ErrorView/ErrorView";
import Form from "./Components/Form/Form";

function App() {
  return (
    <div className="App">
      <Form />
      <div>
        <ErrorView />
      </div>
    </div>
  );
}

export default App;
