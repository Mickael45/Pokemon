import { useState } from "react";
import HomePage from "./ui/pages/Home/Home";
import DetailsPage from "./ui/pages/Details/Details";
import TypeInteractionsPage from "./ui/pages/TypeInteractions/TypeInteractions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorScreen } from "./ui/ErrorScreen/ErrorScreen";
import LoadingContext from "./context/LoadingContext";
import ErrorContext from "./context/ErrorContext";

const renderErrorScreen = () => <ErrorScreen type="Page Not Found" />;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  return (
    <BrowserRouter>
      <ErrorContext.Provider value={{ error, setError }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/details/:id" component={DetailsPage} />
            <Route path="/type-interactions" component={TypeInteractionsPage} />
            <Route component={renderErrorScreen} />
          </Switch>
        </LoadingContext.Provider>
      </ErrorContext.Provider>
    </BrowserRouter>
  );
};

export default App;
