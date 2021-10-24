import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetailsByNameOrId } from "../../../services";
import { ImageWithPlaceholder, PokemonType, Radar } from "../../components";
import { Page } from "../../templates";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
interface Params {
  id: string;
}

const Details = () => {
  const { id } = useParams<Params>();
  const [pokemon, setPokemon] = useState<IFullPokemon>({
    imageUrl: "",
    name: "",
    types: "",
    id: 0,
    stats: [],
  });
  const { imageUrl, name, types, stats } = pokemon;

  const renderType = (type: string) => <PokemonType key={`${id}-${type}`} type={type} handleClick={() => {}} />;
  const renderTypes = () => types.split(",").map(renderType);

  const getPokemonById = () => {
    fetchPokemonDetailsByNameOrId(id).then(setPokemon);
  };

  useEffect(getPokemonById, []);

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
