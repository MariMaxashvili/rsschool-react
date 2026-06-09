import { useNavigate, useSearchParams } from "react-router-dom";
import type { CardProps } from "../../types";
import { usePokemonStore } from "../../store/usePokemonStore";
const Card = ({ pokemon }: CardProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  const { selectedItems, selectItem, unselectItem } = usePokemonStore();
  const isSelected = selectedItems.some((p) => p.id === pokemon.id);
  const handleClick = () => {
    navigate(`/pokemon/${pokemon.name}?page=${currentPage}`);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      selectItem(pokemon);
    } else {
      unselectItem(pokemon.id);
    }
  };
  return (
    <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
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
    </div>
  );
};

export { Card };
