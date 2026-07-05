export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}
export interface CardProps {
  pokemon: PokemonDetail;
  page: number;
  q?: string;
}
export interface CardListProps {
  results: PokemonDetail[];
  error: string | null;
  page: number;
  q?: string;
}
