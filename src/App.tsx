import { HomePage, DetailsPage, TypeInteractionsPage } from "./ui/pages";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Route path="/" exact component={HomePage} />
    <Route path="/details/:id" component={DetailsPage} />
    <Route path="/type-interactions" component={TypeInteractionsPage} />
  </BrowserRouter>
);

export default App;
