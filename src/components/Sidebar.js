"use client";

import styles from "../styles/components/Sidebar.module.css";
import { useColor } from "@/app/page";

export const Sidebar = () => {
  const { color, setColor } = useColor();

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Card color</h1>
      <input type="color" value={color} onChange={handleChange} />
    </div>
  );
};
