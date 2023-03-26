import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: "small" | "medium" | "large";
  styleType?: "primary" | "secondary";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  styleType = "primary",
  className,
  disabled,
  size = "large",
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.secondary]: styleType === "secondary",
        [styles.small]: size === "small",
        [styles.large]: size === "large",
      })}
      {...props}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
