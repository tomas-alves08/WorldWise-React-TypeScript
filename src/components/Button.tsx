import { FC, ReactNode, MouseEvent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onclick: (event: MouseEvent<HTMLButtonElement>) => void;
  type: string;
}

const Button: FC<ButtonProps> = ({ children, onclick, type }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
