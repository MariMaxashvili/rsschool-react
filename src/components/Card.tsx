import React from "react";
import type { CardProps } from "../types";
export class Card extends React.Component<CardProps> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className="card">
        <span className="card-name">{pokemon.name}</span>
        <span className="card-description">
          Types: {pokemon.types.map((t) => t.type.name).join(", ")} | Abilities:{" "}
          {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </span>
      </div>
    );
  }
}
