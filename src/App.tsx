import { useState } from "react";
import HomePage from "./ui/pages/Home/Home";
import DetailsPage from "./ui/pages/Details/Details";
import TypeInteractionsPage from "./ui/pages/TypeInteractions/TypeInteractions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorScreen } from "./ui/components/ErrorScreen/ErrorScreen";
import LoadingContext from "./context/LoadingContext";
import ErrorContext from "./context/ErrorContext";
import PokemonContext from "./context/PokemonContext";
import { SOMETHING_WRONG_HAPPENED } from "./constants/Errors";
import { fetchAllPokemons } from "./services/fetchPokemons/fetchPokemons";
import usePokemons from "./hooks/usePokemons";
import NavigationBar from "./ui/components/NavigationBar/NavigationBar";

const renderErrorScreen = () => <ErrorScreen type="Page Not Found" />;

const App = () => {
  const [filteredPokemons, pokemons, setPokemons] = usePokemons();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const handlePromiseResolution = (newPokemons: IBasicPokemon[]) => {
    setPokemons(newPokemons);
    setLoading(false);
  };

  const setErrorToSomethingWrongHappened = () => setError(SOMETHING_WRONG_HAPPENED);

  const getAllPokemons = () => {
    if (pokemons.length === 0) {
      setLoading(true);
      fetchAllPokemons().then(handlePromiseResolution).catch(setErrorToSomethingWrongHappened);
    }
  };

  return (
    <>
      <BrowserRouter>
        <ErrorContext.Provider value={{ error, setError }}>
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <PokemonContext.Provider value={{ filteredPokemons, pokemons, setPokemons, getAllPokemons }}>
              <NavigationBar />
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/details/:id" component={DetailsPage} />
                <Route path="/type-interactions" component={TypeInteractionsPage} />
                <Route component={renderErrorScreen} />
              </Switch>
            </PokemonContext.Provider>
          </LoadingContext.Provider>
        </ErrorContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
