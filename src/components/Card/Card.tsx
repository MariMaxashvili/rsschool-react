"use client";
import { Link } from "@/i18n/navigation";
import type { CardProps } from "@/types";
import { usePokemonStore } from "@/store/usePokemonStore";
import Image from "next/image";
const Card = ({ pokemon, page, q }: CardProps) => {
  const { selectedItems, selectItem, unselectItem } = usePokemonStore();
  const isSelected = selectedItems.some((p) => p.id === pokemon.id);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      selectItem(pokemon);
    } else {
      unselectItem(pokemon.id);
    }
  };
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  return (
    <Link
      href={{
        pathname: "/",
        query: { page: String(page), ...(q ? { q } : {}), id: pokemon.name },
      }}
      className="card"
    >
      <div
        className="card-image-wrapper"
        style={{
          width: "64px",
          height: "64px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src={imageUrl}
          alt={`Sprite of ${pokemon.name}`}
          width={64}
          height={64}
          priority={pokemon.id <= 10}
        />
      </div>
      <span className="card-name">{pokemon.name}</span>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckbox}
        onClick={(e) => e.stopPropagation()}
      />
      <span className="card-description">
        Types: {pokemon.types.map((t) => t.type.name).join(", ")} | Abilities:{" "}
        {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </span>
    </Link>
  );
};

export { Card };
