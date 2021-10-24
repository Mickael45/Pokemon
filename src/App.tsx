import { HomePage, DetailsPage } from "./ui/pages";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Route path="/" exact component={HomePage} />
    <Route path="/details:id" component={DetailsPage} />
  </BrowserRouter>
);

export default App;
