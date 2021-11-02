import EffectivenessTypeToDamageFactorHashMap from "../../constants/EffectivenessTypeToDamageFactorHashMap";

export const convertEffectivenessStringToDamageRatio = (effectiveness: PokemonEffectivenessType): DamageFactor =>
  EffectivenessTypeToDamageFactorHashMap[effectiveness];
