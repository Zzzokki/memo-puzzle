"use client";

import { useState } from "react";
import styles from "./page.module.css";

const isContainsNumber = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (password[i].charCodeAt(0) >= 48 && password[i].charCodeAt(0) <= 57) {
      return 1;
    }
  }

  return 0;
};

const isContainsSpecialCharacter = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (
      (password[i].charCodeAt(0) >= 33 && password[i].charCodeAt(0) <= 47) ||
      (password[i].charCodeAt(0) >= 58 && password[i].charCodeAt(0) <= 64) ||
      (password[i].charCodeAt(0) >= 91 && password[i].charCodeAt(0) <= 96) ||
      (password[i].charCodeAt(0) >= 123 && password[i].charCodeAt(0) <= 126)
    ) {
      return 1;
    }
  }

  return 0;
};

const isContainsUpperCase = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (password[i].charCodeAt(0) >= 65 && password[i].charCodeAt(0) <= 90) {
      return 1;
    }
  }

  return 0;
};

const isLengthGreaterThan8 = (password) => {
  return password.length >= 8 ? 1 : 0;
};

const calculateStrength = (password) => {
  let strength = 0;

  strength += isContainsNumber(password);
  strength += isContainsSpecialCharacter(password);
  strength += isContainsUpperCase(password);
  strength += isLengthGreaterThan8(password);

  return strength;
};

export default function Home() {
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className={styles.container}>
      <input
        type={isHidden ? "password" : "text"}
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        {isHidden ? "Show" : "Hide"}
      </button>

      <PasswordStrength strength={calculateStrength(password)} />
    </div>
  );
}

const textMap = {
  0: "Weak",
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

const colorMap = {
  0: "#828282",
  1: "#EA1111",
  2: "#FFBA08",
  3: "#1EAE98",
  4: "#10B981",
};

const PasswordStrength = (props) => {
  return (
    <div className={styles.strength__container}>
      <div className={styles.strength}>
        {["", "", "", ""].map((_, index) => {
          return (
            <div
              key={index}
              className={styles.strength__bar}
              style={{
                backgroundColor:
                  index < props.strength ? colorMap[props.strength] : "#E5E7EB",
              }}
            ></div>
          );
        })}
      </div>

      <p>{textMap[props.strength]}</p>
    </div>
  );
};
