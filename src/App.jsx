import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import KreiranjeCenovnika from "./pages/KreiranjeCenovnika/KreiranjeCenovnika";
import PregledIzlazneFakture from './pages/PregledIzlazneFakture/PregledIzlazneFakture';
import PrikazCenovnika from "./pages/PrikazCenovnika/PrikazCenovnika";
import UnosIzlazneFakture from './pages/UnosIzlazneFakture/UnosIzlazneFakture'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
          <Route path="/pregled-izlazne-fakture" component={PregledIzlazneFakture} />
          <Route path="/cenovnici" component={PrikazCenovnika} />
          <Route path="/kreiranje-cenovnka" component={KreiranjeCenovnika} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
