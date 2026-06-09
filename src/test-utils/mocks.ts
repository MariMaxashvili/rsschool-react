export const mockPokemon = {
  id: 1,
  name: "bulbasaur",
  base_experience: 64,
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],

  abilities: [
    { ability: { name: "overgrow" } },
    { ability: { name: "chlorophyll" } },
  ],
};

export const mockPokemonList = [
  mockPokemon,
  {
    id: 4,
    name: "charmander",
    base_experience: 62,
    types: [{ type: { name: "fire" } }],
    abilities: [{ ability: { name: "blaze" } }],
  },
];
