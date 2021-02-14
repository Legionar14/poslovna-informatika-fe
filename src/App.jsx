import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PregledIzlazneFakture from './pages/PregledIzlazneFakture/PregledIzlazneFakture';
import UnosIzlazneFakture from './pages/UnosIzlazneFakture';
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <div className="App">
      <Router>
        <h1>poslovna informatika</h1>
        <Switch>
          <Route path="/pregled-izlazne-fakture" component={PregledIzlazneFakture} />
          <Route path="/unos-izlazne-fakture" component={UnosIzlazneFakture} />
        </Switch>
      </Router>
      <NotificationContainer/>
    </div>
  );
}

export default App;
