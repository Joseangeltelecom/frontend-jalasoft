import "./App.css";
import Bootcamper from "./components/Bootcamper";

const bootcampers = [
  "JoseAngel",
  "Esteban",
  "Joaquin",
  "Edgar",
  "Xochihuas",
  "Diego",
];

function App() {
  return (
    <div className="App">
      {bootcampers.map((camper, index) => (
        <Bootcamper key={index} name={camper} />
      ))}
    </div>
  );
}

export default App;
