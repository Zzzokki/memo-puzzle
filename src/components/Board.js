import styles from "../styles/components/Board.module.css";
import { Card } from "./Card";
import { useGame } from "./Game";

export const Board = () => {
  const { data } = useGame();

  return (
    <div className={styles.board}>
      {data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};
