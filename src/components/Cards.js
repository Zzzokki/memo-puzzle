import styles from "../styles/components/Cards.module.css";
import { Card } from "./Card";

export const Cards = () => {
  return (
    <div className={styles.container}>
      {new Array(6).fill(0).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
};
