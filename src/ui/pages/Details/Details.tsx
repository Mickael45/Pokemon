import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchPokemonDetailsByNameOrId } from "../../../services";
import { ImageWithPlaceholder, PokemonType, Radar } from "../../components";
import { Page } from "../../templates";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
interface Params {
  id: string;
}

const DEFAULT_POKEMON = {
  imageUrl: "",
  name: "",
  types: "",
  id: 0,
  stats: [],
};

const Details = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const [pokemon, setPokemon] = useState<IFullPokemon>(DEFAULT_POKEMON);
  const { imageUrl, name, types, stats } = pokemon;

  const getPokemonById = () => {
    fetchPokemonDetailsByNameOrId(id).then(setPokemon);
  };

  useEffect(getPokemonById, []);

  const onTypeClick = (type: string) =>
    history.push({
      pathname: "/",
      search: `name=${type}&field=types`,
    });

  const renderType = (type: string) => <PokemonType key={`${id}-${type}`} type={type} handleClick={onTypeClick} />;
  const renderTypes = () => types.split(",").map(renderType);
  const renderStatsRadar = () => (stats.length > 0 ? <Radar title="Stats" axisDataList={stats} color="red" /> : null);

  return (
    <Page>
      <div>
        <ImageWithPlaceholder src={imageUrl} alt={`${name}-pic`} />
        <span>{id}</span>
        <h2>{capitalizeFirstLetter(name)}</h2>
        {renderTypes()}
        {renderStatsRadar()}
      </div>
    </Page>
  );
};

export default Details;
