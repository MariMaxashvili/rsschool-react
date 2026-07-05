import { Card } from "../Card/Card";
import type { CardListProps } from "../../types";
import styles from "./CardList.module.css";

const CardList = ({ results, error, page, q }: CardListProps) => {
  return (
    <div className={styles.resultsSection}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {results.map((p) => (
        <Card key={p.name} pokemon={p} page={page} q={q} />
      ))}
    </div>
  );
};

export { CardList };
