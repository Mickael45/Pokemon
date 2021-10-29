import { useEffect, useState } from "react";
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

const renderErrorScreen = () => <ErrorScreen type="Page Not Found" />;

const usePokemons = (): [IBasicPokemon[], IBasicPokemon[], (pokemons: IBasicPokemon[]) => void] => {
  const [pokemons, setPokemons] = useState<IBasicPokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<IBasicPokemon[]>([]);

  const updatePokemons = () => {
    if (!pokemons || pokemons.length === 0) {
      setPokemons(filteredPokemons);
    }
  };

  useEffect(updatePokemons, [filteredPokemons]);

  return [filteredPokemons, pokemons, setFilteredPokemons];
};

const App = () => {
  const [filteredPokemons, pokemons, setPokemons] = usePokemons();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType | null>(null);

  const handlePromiseResolution = (newPokemons: IBasicPokemon[]) => {
    setPokemons(newPokemons);
    setLoading(false);
  };

  const setErrorToSomethingWrongHappened = (e: any) => {
    console.log(e, e.status);
    setError(SOMETHING_WRONG_HAPPENED);
  };

  const getAllPokemons = () => {
    fetchAllPokemons().then(handlePromiseResolution).catch(setErrorToSomethingWrongHappened);
  };

  useEffect(getAllPokemons, []);

  return (
    <BrowserRouter>
      <ErrorContext.Provider value={{ error, setError }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <PokemonContext.Provider value={{ filteredPokemons, pokemons, setPokemons }}>
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
  );
};

export default App;
