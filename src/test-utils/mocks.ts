export const mockPokemon = {
  name: "bulbasaur",
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],

  abilities: [
    { ability: { name: "overgrow" } },
    { ability: { name: "chlorophyll" } },
  ],
};

export const mockPokemonList = [
  mockPokemon,
  {
    name: "charmander",
    types: [{ type: { name: "fire" } }],
    abilities: [{ ability: { name: "blaze" } }],
  },
];
