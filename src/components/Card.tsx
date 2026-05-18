import type { CardProps } from "../types";

const Card = ({ pokemon }: CardProps) => {
  return (
    <div className="card">
      <span className="card-name">{pokemon.name}</span>
      <span className="card-description">
        Types: {pokemon.types.map((t) => t.type.name).join(", ")} | Abilities:{" "}
        {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </span>
    </div>
  );
};

export { Card };
