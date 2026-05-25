export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}
export interface CardProps {
  pokemon: PokemonDetail;
}
export interface CardListProps {
  results: PokemonDetail[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  pokemon: string;
  results: PokemonDetail[];
  loading: boolean;
  error: string | null;
  throwError: boolean;
}
