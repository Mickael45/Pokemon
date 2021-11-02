import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ErrorScreen } from "./ui/components/ErrorScreen/ErrorScreen";
import LoadingContext from "./context/LoadingContext";
import ErrorContext from "./context/ErrorContext";
import ResolutionContext from "./context/ResolutionContext";
import ThemeContext from "./context/ThemeContext";
import PokemonContext from "./context/PokemonContext";
import { SOMETHING_WRONG_HAPPENED } from "./constants/Errors";
import { DARK } from "./constants/Theme";
import { LOW_RESOLUTION } from "./constants/Resolution";
import { fetchAllPokemons } from "./services/fetchPokemons/fetchPokemons";
import usePokemons from "./hooks/usePokemons";
import NavigationBar from "./ui/components/NavigationBar/NavigationBar";
import styles from "./App.module.css";
import PikachuLoader from "./ui/components/PikachuLoader/PikachuLoader";

const HomePage = lazy(() => import("./ui/pages/Home/Home"));
const DetailsPage = lazy(() => import("./ui/pages/Details/Details"));
const TypeInteractionsPage = lazy(() => import("./ui/pages/TypeInteractions/TypeInteractions"));

const renderErrorScreen = () => <ErrorScreen type="Page Not Found" />;

const App = () => {
  const [filteredPokemons, pokemons, setPokemons] = usePokemons();
  const [loading, setLoading] = useState(true);
  const [resolution, setResolution] = useState<RESOLUTION>(LOW_RESOLUTION);
  const [theme, setTheme] = useState<THEME>(DARK);
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
    <div data-resolution={resolution} className={styles.container} data-theme={theme}>
      <BrowserRouter>
        <ResolutionContext.Provider value={{ resolution, setResolution }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <ErrorContext.Provider value={{ error, setError }}>
              <LoadingContext.Provider value={{ loading, setLoading }}>
                <PokemonContext.Provider value={{ filteredPokemons, pokemons, setPokemons, getAllPokemons }}>
                  <Suspense fallback={<PikachuLoader />}>
                    <NavigationBar />
                    <Switch>
                      <Route path="/" exact component={HomePage} />
                      <Route path="/details/:id" component={DetailsPage} />
                      <Route path="/type-interactions" component={TypeInteractionsPage} />
                      <Route component={renderErrorScreen} />
                    </Switch>
                  </Suspense>
                </PokemonContext.Provider>
              </LoadingContext.Provider>
            </ErrorContext.Provider>
          </ThemeContext.Provider>{" "}
        </ResolutionContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
