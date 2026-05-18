import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import type { PokemonDetail } from "../types";
import "../App.css";

export const PokemonDetailsPanel = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [detailData, setDetailData] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`,
        );
        if (!response.ok) throw new Error("Failed to load details.");
        const data = await response.json();
        setDetailData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);
  const handleClose = () => {
    const page = searchParams.get("page") || "1";
    navigate(`/?page=${page}`);
  };

  if (loading) return <div className="details-loading">Loading details...</div>;

  if (error)
    return (
      <div className="details-error">
        {error} <button onClick={handleClose}>Close</button>
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
