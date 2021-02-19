import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import KnjigaIzlaznihFaktura from "./pages/KnjigaIzlaznihFaktura/KnjigaIzlaznihFaktura";
import KreiranjeCenovnika from "./pages/KreiranjeCenovnika/KreiranjeCenovnika";
import PrikazCenovnika from "./pages/PrikazCenovnika/PrikazCenovnika";
import PregledIzlazneFakture from './pages/PregledIzlazneFakture';
import UnosIzlazneFakture from './pages/UnosIzlazneFakture';
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
          <Route path="/pregled-izlazne-fakture" component={PregledIzlazneFakture} />
          <Route path="/kif" component={KnjigaIzlaznihFaktura} />
          <Route path="/cenovnici" component={PrikazCenovnika} />
          <Route path="/kreiranje-cenovnka" component={KreiranjeCenovnika} />
          <Route path="/pregled-izlazne-fakture/:id" component={PregledIzlazneFakture} />
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
          <Route path="/izmena-izlazne-fakture/:id" component={UnosIzlazneFakture} />
        </Switch>
      </Router>
      <NotificationContainer/>
    </div>
  );
}

export default App;
