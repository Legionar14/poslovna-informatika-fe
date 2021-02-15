import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PregledIzlazneFakture from './pages/PregledIzlazneFakture';
import UnosIzlazneFakture from './pages/UnosIzlazneFakture';
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
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
