import EffectivenessTypeToDamageFactorHashMap from "../../constants/EffectivenessTypeToDamageFactorHashMap";

export const convertEffectivenessStringToDamageRatio = (effectiveness: PokemonEffectivenessType) =>
  EffectivenessTypeToDamageFactorHashMap[effectiveness];
