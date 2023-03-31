import "./App.css";
import Dictaphone from "./components/dictaphone/dictaphone";
import logo from "./bg.jpg";
function App() {
  return (
    <div className="App">
      <img src={logo} width="100%"></img>
      <h1>ALL ABOUT PREMATURE BABIES</h1>
      <Dictaphone />
    </div>
  );
}

export default App;
