import "./App.css";
import Dictaphone from "./components/dictaphone/dictaphone";
import logo from "./logo-eon-red.svg";
function App() {
  return (
    <div className="App">
      <img src={logo} width="100%"></img>
      <h1>All About ElecTrip powered by E.ON Drive.</h1>
      <Dictaphone />
    </div>
  );
}

export default App;
