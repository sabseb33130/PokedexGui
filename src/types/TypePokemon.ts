import { TypeEgg } from './TypeEgg';
import { TypeEvolution } from './TypeEvolution';
import { TypeName } from './TypeName';
import { TypeResistances } from './TypeResistances';
import { TypeSexe } from './TypeSexe';
import { TypeSprites } from './TypeSprite';
import { TypeStats } from './TypeStats';
import { TypeTalents } from './TypeTalents';
import { TypeTypes } from './TypeTypes';

export type TypePokemon = {
    pokedexId: number;
    generation: number;
    category: string;
    name: TypeName;
    sprites: TypeSprites;
    types: TypeTypes;
    talents: TypeTalents;
    stats: TypeStats;
    resistances: TypeResistances;
    evolution: TypeEvolution;
    height: string;
    weight: string;
    egg_groups: TypeEgg;
    sexe: TypeSexe;
    catch_rate: number;
    level_100: number;
    forme: string | null;
};
