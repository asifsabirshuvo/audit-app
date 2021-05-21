import AllAudits from "./Audit/AllAudits.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
     <Switch>
          <Route path="/" component={AllAudits} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
