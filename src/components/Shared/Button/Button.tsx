import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  styleType?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  text,
  styleType = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.secondary]: styleType === "secondary",
      })}
      {...props}
    >
      {text}
    </button>
  );
};
