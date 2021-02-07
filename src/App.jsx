import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PregledIzlazneFakture from "./PregledIzlazneFakture/PregledIzlazneFakture";
import UnosIzlazneFakture from "./UnosIzlazneFakture/UnosIzlazneFakture"

function App() {
  return (
    <div className="App">
      <Router>
        <h1>poslovna informatika</h1>
        <Switch>
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
          <Route path="/pregled-izlazne-fakture" component={PregledIzlazneFakture} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
