import Image from "next/image";
import styles from "../styles/components/Card.module.css";
import { useGame } from "./Game";

export const Card = ({ id, value, src }) => {
  const { flipped, setFlipped, isRunning, solved } = useGame();

  const isFlipped = flipped.includes(id);

  const isSolved = solved.includes(id);

  const handleClick = () => {
    if (isFlipped || !isRunning || isSolved) {
      return;
    }

    setFlipped((flipped) => {
      if (flipped.length === 2) {
        return [id];
      }

      return [...flipped, id];
    });
  };

  return (
    <div
      className={styles.card}
      style={{ opacity: isSolved ? 0 : 1 }}
      onClick={handleClick}
    >
      {isFlipped && <Image src={src} alt={value} fill />}
    </div>
  );
};
