import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import KnjigaIzlaznihFaktura from "./pages/KnjigaIzlaznihFaktura/KnjigaIzlaznihFaktura";
import KreiranjeCenovnika from "./pages/KreiranjeCenovnika/KreiranjeCenovnika";
import PrikazCenovnika from "./pages/PrikazCenovnika/PrikazCenovnika";
import PregledIzlazneFakture from './pages/PregledIzlazneFakture';
import UnosIzlazneFakture from './pages/UnosIzlazneFakture';
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import JediniceMere from './pages/JediniceMere/JediniceMere';
import RobaIliUsluga from './pages/RobaIliUsluga/RobaIliUsluga';
import UnosPdvKategorije from "./pages/UnosPdvKategorije";
import UnosPdvStope from "./pages/UnosPdvStope";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
          <Route path="/kif" component={KnjigaIzlaznihFaktura} />
          <Route path="/cenovnici" component={PrikazCenovnika} />
          <Route path="/kreiranje-cenovnka" component={KreiranjeCenovnika} />
          <Route path="/pregled-izlazne-fakture/:id" component={PregledIzlazneFakture} />
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
          <Route path="/izmena-izlazne-fakture/:id" component={UnosIzlazneFakture} />
          <Route path="/jedinice-mere" component={JediniceMere} />
          <Route path="/roba-ili-usluga" component={RobaIliUsluga} />
          <Route path="/unos-pdv-kategorije" component={UnosPdvKategorije} />
          <Route path="/unos-pdv-stope" component={UnosPdvStope} />
        </Switch>
      </Router>
      <NotificationContainer/>
    </div>
  );
}

export default App;
