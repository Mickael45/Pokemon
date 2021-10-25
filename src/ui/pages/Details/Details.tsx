import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchPokemonDetailsByNameOrId } from "../../../services";
import { ImageWithPlaceholder, PokemonType, Radar } from "../../components";
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
};

const Details = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const [pokemon, setPokemon] = useState<IFullPokemon>(DEFAULT_POKEMON);
  const { imageUrl, name, stats, height, weight, types, weaknesses } = pokemon;

  const getPokemonById = () => {
    fetchPokemonDetailsByNameOrId(id).then(setPokemon);
  };

  const getPrimaryTypeColor = () => {
    const primaryType = types.split(",")[0];
    const castedPokemonTypesColor = pokemonTypesColor as MAP;

    return castedPokemonTypesColor[primaryType];
  };

  const onTypeClick = (type: string) =>
    history.push({
      pathname: "/",
      search: `name=${type}&field=types`,
    });

  const renderType = (type: string, child?: any) => (
    <PokemonType key={`${id}-${type}`} type={type} handleClick={onTypeClick}>
      {child}
    </PokemonType>
  );
  const renderTypes = () => {
    const renderTypeWithoutChild = (type: string) => renderType(type);

    return types.split(",").map(renderTypeWithoutChild);
  };
  const renderWeakness = ({ type, factor }: Weakness) => renderType(type, ` (x${factor})`);
  const renderWeaknesses = () => weaknesses.map(renderWeakness);
  const renderStatsRadar = () =>
    stats.length > 0 ? <Radar title="Stats" axisDataList={stats} color={getPrimaryTypeColor()} /> : null;
  const renderHeight = () => <p>{`Height: ${convertCmtoMeterString(height)} (${cmToFeetString(height)})`}</p>;
  const renderWeight = () => <p>{`Weight: ${joinValueWithUnit(weight, "kg")} (${kgToPoundsString(weight)})`}</p>;

  useEffect(getPokemonById, []);

  return (
    <Page>
      <div>
        <ImageWithPlaceholder src={imageUrl} alt={`${name}-pic`} />
        <span>{id}</span>
        <h2>{capitalizeFirstLetter(name)}</h2>
        {renderHeight()}
        {renderWeight()}
        <h3>Types:</h3>
        {renderTypes()}
        <h3>Weaknesses:</h3>
        {renderWeaknesses()}
        {renderStatsRadar()}
      </div>
    </Page>
  );
};

export default Details;
