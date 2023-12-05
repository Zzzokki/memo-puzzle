"use client";

import { Game } from "@/components/Game";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Game />
    </div>
  );
}
