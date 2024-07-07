export interface NameWithKorean {
    name: string;
    korean_name: string;
}

export interface Pokemon {
    id: number;
    name: string;
    korean_name: string | null;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other?: {
            dream_world: {
                front_default: string | null;
            };
        };
    };
    image: string | null;
    types: { type: NameWithKorean }[];
    abilities: { ability: NameWithKorean }[];
    moves: { move: NameWithKorean }[];
}

export interface PokemonDetailProps {
    pokemon: Pokemon;
}

export interface PokemonDetailPageProps {
    params: {
        id: string;
    };
}
