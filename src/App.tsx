import HomePage from "./ui/pages/Home/Home";
import DetailsPage from "./ui/pages/Details/Details";
import TypeInteractionsPage from "./ui/pages/TypeInteractions/TypeInteractions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorScreen } from "./ui/ErrorScreen/ErrorScreen";

const renderErrorScreen = () => <ErrorScreen type="Page Not Found" />;

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/details/:id" component={DetailsPage} />
      <Route path="/type-interactions" component={TypeInteractionsPage} />
      <Route component={renderErrorScreen} />
    </Switch>
  </BrowserRouter>
);

export default App;
