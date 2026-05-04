import React from "react";
import { Card } from "./Card";
import type { CardListProps } from "../types";

export class CardList extends React.Component<CardListProps> {
  render() {
    const { results, loading, error } = this.props;
    return (
      <div className="results-section">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {results.map((p) => (
          <Card key={p.name} pokemon={p} />
        ))}
      </div>
    );
  }
}
