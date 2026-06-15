import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "../../App.css";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";

export const PokemonDetailsPanel = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { detailData, loading, error } = usePokemonDetails(id);

  const handleClose = () => {
    const page = searchParams.get("page") || "1";
    navigate(`/?page=${page}`);
  };

  if (loading)
    return <div className="spinner" role="status" aria-label="Loading..." />;

  if (error)
    return (
      <div className="details-error">
        <p>Failed to load Pokémon details. Please try again.</p>
        <button onClick={handleClose}>Close</button>
      </div>
    );
  if (!detailData) return null;

  return (
    <div className="details-card">
      <div className="details-header">
        <h2>{detailData.name.toUpperCase()}</h2>
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
      </div>

      <div className="details-body">
        <h3>Types</h3>
        <ul className="details-list">
          {detailData.types.map((t, index) => (
            <li key={index}>{t.type.name}</li>
          ))}
        </ul>

        <h3>Abilities</h3>
        <ul className="details-list">
          {detailData.abilities.map((a, index) => (
            <li key={index}>{a.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
