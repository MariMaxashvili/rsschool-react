import { useNavigate, useSearchParams } from "react-router-dom";
import type { CardProps } from "../../types";

const Card = ({ pokemon }: CardProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const handleClick = () => {
    navigate(`/pokemon/${pokemon.name}?page=${currentPage}`);
  };
  return (
    <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <span className="card-name">{pokemon.name}</span>
      <span className="card-description">
        Types: {pokemon.types.map((t) => t.type.name).join(", ")} | Abilities:{" "}
        {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </span>
    </div>
  );
};

export { Card };
