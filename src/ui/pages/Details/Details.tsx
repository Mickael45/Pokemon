import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetailsByNameOrId } from "../../../services/fetchPokemons/fetchPokemons";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import ImageWithPlaceholder from "../../components/ImageWithPlaceholder/ImageWithPlaceholder";
import BasicInfo from "../../components/PokemonBasicInfo/PokemonBasicInfo";
import EvolutionChain from "../../components/EvolutionChain/EvolutionChain";
import Radar from "../../components/Radar/Radar";
import IdNavigation from "../../components/IdNavigation/IdNavigation";
import { DEFAULT_POKEMON } from "../../../constants/DefaultPokemons";
import { getPokemonPrimaryTypeColor } from "../../../utils/pokemonFormatter/pokemonFormatter";
import Page from "../../templates/Page/Page";
import styles from "./Details.module.css";
import PokemonTypes from "../../components/PokemonTypes/PokemonTypes";
import PokemonWeaknesses from "../../components/PokemonWeaknesses/PokemonWeaknesses";
import { SOMETHING_WRONG_HAPPENED } from "../../../constants/Errors";
import ErrorScreenWrapper from "../../components/Wrappers/ErrorScreenWrapper/ErrorScreenWrapper";
import LoadingScreenWrapper from "../../components/Wrappers/LoadingScreenWrapper/LoadingScreenWrapper";
import LoadingContext from "../../../context/LoadingContext";
import ErrorContext from "../../../context/ErrorContext";
import { usePokemonPic } from "../../../hooks/usePokemonPic";
interface Params {
  id: string;
}

const DetailsPage = () => {
  const { id } = useParams<Params>();
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
  const [pokemon, setPokemon] = useState<IFullPokemon>(DEFAULT_POKEMON);
  const {
    hdImageUrl,
    pixelImageUrl,
    name,
    stats,
    height,
    weight,
    types,
    weaknesses,
    evolutionChain,
    abilities,
    description,
    category,
  } = pokemon;
  const imageUrl = usePokemonPic(pixelImageUrl, hdImageUrl);
  const color = getPokemonPrimaryTypeColor(types);
  const basicInfo = { description, height, weight, category, types, abilities, color };

  const updatePokemon = (pokemon: IFullPokemon) => {
    setPokemon(pokemon);
    setLoading(false);
  };

  const setErrorToSomethingWrongHappened = () => setError(SOMETHING_WRONG_HAPPENED);

  const getPokemonById = () => {
    setLoading(true);
    fetchPokemonDetailsByNameOrId(id).then(updatePokemon).catch(setErrorToSomethingWrongHappened);
  };

  useEffect(getPokemonById, [id]);

  return (
    <ErrorScreenWrapper>
      <LoadingScreenWrapper>
        <Page>
          <div>
            <IdNavigation id={id} />
            <div className={styles.container}>
              <div>
                <h2>{capitalizeFirstLetter(name)}</h2>
                <h3>{`#${id}`}</h3>
              </div>
              <div>
                <span>
                  <ImageWithPlaceholder src={imageUrl} alt={`${name}-pic`} />
                  <div>
                    <Radar title="Stats" axisDataList={stats} color={color} />
                  </div>
                </span>
                <span>
                  <BasicInfo {...basicInfo} />
                  <div>
                    <h3>Types</h3>
                    <PokemonTypes id={id} types={types} />
                    <h3>Weaknesses</h3>
                    <PokemonWeaknesses id={id} types={weaknesses} />
                  </div>
                </span>
                <EvolutionChain chain={evolutionChain} />
              </div>
            </div>
          </div>
        </Page>
      </LoadingScreenWrapper>
    </ErrorScreenWrapper>
  );
};

export default DetailsPage;
