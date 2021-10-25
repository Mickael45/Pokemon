import { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchPokemonDetailsByNameOrId } from "../../../services";
import { ImageWithPlaceholder, PokemonType, Radar, EvolutionChain } from "../../components";
import { Page } from "../../templates";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import {
  convertCmtoMeterString,
  cmToFeetString,
  joinValueWithUnit,
  kgToPoundsString,
} from "../../../utils/unitConverter";
import pokemonTypesColor from "../../../constants/PokemonTypesColor.json";
interface Params {
  id: string;
}

const DEFAULT_POKEMON = {
  imageUrl: "",
  name: "",
  types: "",
  height: 0,
  weight: 0,
  id: 0,
  stats: [],
  weaknesses: [],
  evolutionChain: [],
  abilities: [],
  description: "",
  category: "",
};

const Details = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const [pokemon, setPokemon] = useState<IFullPokemon>(DEFAULT_POKEMON);
  const { imageUrl, name, stats, height, weight, types, weaknesses, evolutionChain, abilities, description, category } =
    pokemon;

  const getPokemonById = () => {
    fetchPokemonDetailsByNameOrId(id).then(setPokemon);
  };

  const getPrimaryTypeColor = () => {
    const primaryType = types.split(",")[0];
    const castedPokemonTypesColor = pokemonTypesColor as MAP;

    return castedPokemonTypesColor[primaryType];
  };

  const handleTypeClick = (type: string) =>
    history.push({
      pathname: "/",
      search: `name=${type}&field=types`,
    });

  const handlePreviousButtonClick = () => history.push(`/details/${pokemon.id - 1}`);

  const handleNextButtonClick = () => history.push(`/details/${pokemon.id + 1}`);

  const callBackedHandleTypeClick = useCallback(handleTypeClick, []);

  const renderType = (type: string, child?: any) => (
    <PokemonType key={`${id}-${type}`} type={type} handleClick={callBackedHandleTypeClick}>
      {child}
    </PokemonType>
  );
  const renderTypes = () => {
    const renderTypeWithoutChild = (type: string) => renderType(type);

    return types.split(",").map(renderTypeWithoutChild);
  };
  const renderWeakness = ({ type, factor }: Weakness) => renderType(type, ` (x${factor})`);
  const renderWeaknesses = () => weaknesses.map(renderWeakness);
  const renderAbility = (ability: string) => <p>{ability}</p>;
  const renderAblilities = () => abilities.map(renderAbility);
  const renderStatsRadar = () => <Radar title="Stats" axisDataList={stats} color={getPrimaryTypeColor()} />;
  const renderHeight = () => <p>{`Height: ${convertCmtoMeterString(height)} (${cmToFeetString(height)})`}</p>;
  const renderWeight = () => <p>{`Weight: ${joinValueWithUnit(weight, "kg")} (${kgToPoundsString(weight)})`}</p>;

  useEffect(getPokemonById, [id]);

  return (
    <Page>
      <div>
        <span>
          <button onClick={handlePreviousButtonClick}>{pokemon.id - 1}</button>
          <button onClick={handleNextButtonClick}>{pokemon.id + 1}</button>
        </span>
        <ImageWithPlaceholder src={imageUrl} alt={`${name}-pic`} />
        <span>{id}</span>
        <h2>{capitalizeFirstLetter(name)}</h2>
        {renderHeight()}
        {renderWeight()}
        <h3>Description:</h3>
        {description}
        <h3>Category:</h3>
        {category}
        <h3>Abilities:</h3>
        {renderAblilities()}
        <h3>Types:</h3>
        {renderTypes()}
        <h3>Weaknesses:</h3>
        {renderWeaknesses()}
        {renderStatsRadar()}
        <EvolutionChain chain={evolutionChain} handleClick={callBackedHandleTypeClick} />
      </div>
    </Page>
  );
};

export default Details;
