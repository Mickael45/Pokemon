import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetailsByNameOrId } from "../../../services";
import { ImageWithPlaceholder, PokemonType } from "../../components";
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
    stats: [{ name: "", value: 0 }],
  });
  const { imageUrl, name, types, stats } = pokemon;

  const renderType = (type: string) => <PokemonType key={`${id}-${type}`} type={type} handleClick={() => {}} />;
  const renderTypes = () => types.split(",").map(renderType);

  const getPokemonById = () => {
    fetchPokemonDetailsByNameOrId(id).then(setPokemon);
  };

  const renderStat = ({ name, value }: PokemonStat) => console.log(name, value);
  const renderStats = () => stats.map(renderStat);

  useEffect(getPokemonById, []);

  return (
    <Page>
      <div>
        <ImageWithPlaceholder src={imageUrl} alt={`${name}-pic`} />
        <span>{id}</span>
        <h2>{capitalizeFirstLetter(name)}</h2>
        {renderTypes()}
        {renderStats()}
      </div>
    </Page>
  );
};

export default Details;
