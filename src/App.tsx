import HomePage from "./ui/pages/Home/Home";
import DetailsPage from "./ui/pages/Details/Details";
import TypeInteractionsPage from "./ui/pages/TypeInteractions/TypeInteractions";

import { BrowserRouter, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Route path="/" exact component={HomePage} />
    <Route path="/details/:id" component={DetailsPage} />
    <Route path="/type-interactions" component={TypeInteractionsPage} />
  </BrowserRouter>
);

export default App;
