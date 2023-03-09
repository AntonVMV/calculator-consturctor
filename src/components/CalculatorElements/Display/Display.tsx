import { HTMLAttributes } from "react";
import { useAppSelector } from "store";
import styles from "./Display.module.scss";
import cn from "classnames";

interface DisplayProps extends HTMLAttributes<HTMLDivElement> {}

const fontSize = (length: number) => {
  if (length < 9) {
    return 36;
  } else {
    return 36 - (36 / length) * (length - 9);
  }
};

export const Display: React.FC<DisplayProps> = ({ className, ...props }) => {
  const { input } = useAppSelector((state) => state.calculatorSlice);

  return (
    <div className={cn(styles.container, className)} {...props}>
      <div style={{ fontSize: `${fontSize(input.length)}px` }}>{input}</div>
    </div>
  );
};
