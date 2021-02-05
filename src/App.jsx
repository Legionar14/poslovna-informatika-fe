import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import UnosIzlazneFakture from "./UnosIzlazneFakture/UnosIzlazneFakture"

function App() {
  return (
    <div className="App">
      <Router>
        <h1>poslovna informatika</h1>
        <Switch>
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
