import AllAudits from "./Audit/AllAudits.js";
import AddAudit from "./Audit/AddAudit.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
     <Switch>
     <Route path="/" exact component={AllAudits} />
     <Route path="/add-audit" exact component={AddAudit} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
