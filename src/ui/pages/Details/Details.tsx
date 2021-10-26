import { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchPokemonDetailsByNameOrId } from "../../../services/fetchPokemons/fetchPokemons";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import ImageWithPlaceholder from "../../components/ImageWithPlaceholder/ImageWithPlaceholder";
import BasicInfo from "../../components/PokemonBasicInfo/PokemonBasicInfo";
import Type from "../../components/PokemonType/PokemonType";
import EvolutionChain from "../../components/EvolutionChain/EvolutionChain";
import Radar from "../../components/Radar/Radar";

import Page from "../../templates/Page/Page";
import pokemonTypesColor from "../../../constants/TypesColor.json";
import styles from "./Details.module.css";
import IdNavigation from "../../components/IdNavigation/IdNavigation";
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
    const castedPokemonTypesColor = pokemonTypesColor as HashMap;

    return castedPokemonTypesColor[primaryType];
  };

  const handleTypeClick = (type: string) =>
    history.push({
      pathname: "/",
      search: `name=${type}&field=types`,
    });

  const handleNavigationClick = (id: number) => history.push(`/details/${id}`);

  const callBackedHandleTypeClick = useCallback(handleTypeClick, []);

  const renderType = (type: string, child?: any) => (
    <Type key={`${id}-${type}`} type={type} handleClick={callBackedHandleTypeClick}>
      {child}
    </Type>
  );
  const renderTypes = () => {
    const renderTypeWithoutChild = (type: string) => renderType(type);

    return types.split(",").map(renderTypeWithoutChild);
  };
  const renderWeakness = ({ type, factor }: Weakness) => renderType(type, ` (x${factor})`);
  const renderWeaknesses = () => weaknesses.map(renderWeakness);
  const renderSection = (title: string, children: JSX.Element[] | string) => (
    <>
      <h3>{title}</h3>
      {children}
    </>
  );

  useEffect(getPokemonById, [id]);

  return (
    <Page>
      <div className={styles.container}>
        <IdNavigation id={id} handleClick={handleNavigationClick} />
        <div>{`${capitalizeFirstLetter(name)} #${id}`}</div>
        <div>
          <span>
            <ImageWithPlaceholder src={imageUrl} alt={`${name}-pic`} />
            <Radar title="Stats" axisDataList={stats} color={getPrimaryTypeColor()} />
          </span>
          <span>
            <BasicInfo
              background={getPrimaryTypeColor()}
              description={description}
              height={height}
              weight={weight}
              category={category}
              abilities={abilities}
            />
            <div>
              {renderSection("Types", renderTypes())}
              {renderSection("Weaknesses", renderWeaknesses())}
            </div>
          </span>
        </div>
        <EvolutionChain chain={evolutionChain} handleClick={callBackedHandleTypeClick} />
      </div>
    </Page>
  );
};

export default Details;
