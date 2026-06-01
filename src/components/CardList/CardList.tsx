import { Card } from "../Card/Card";
import type { CardListProps } from "../../types";
import "../../App.css";
const CardList = ({ results, loading, error }: CardListProps) => {
  return (
    <div className="results-section">
      {loading && <div className="spinner" />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results.map((p) => (
        <Card key={p.name} pokemon={p} />
      ))}
    </div>
  );
};

export { CardList };
