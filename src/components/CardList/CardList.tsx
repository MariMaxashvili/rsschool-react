import { Card } from "../Card/Card";
import type { CardListProps } from "../../types";

const CardList = ({ results, loading, error }: CardListProps) => {
  return (
    <div className="results-section">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results.map((p) => (
        <Card key={p.name} pokemon={p} />
      ))}
    </div>
  );
};

export { CardList };
