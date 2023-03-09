import { HTMLAttributes } from "react";
import { inputEnter } from "store/slices/calculatorSlice";
import { Button } from "components/Shared/Button/Button";
import { useAppDispatch } from "store";
import styles from "./Numbers.module.scss";
import cn from "classnames";

interface NumbersProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

export const Numbers: React.FC<NumbersProps> = ({
  isActive = true,
  className,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const handler = (item: string) => {
    dispatch(inputEnter(item));
  };

  return (
    <div className={cn(styles.container, className)} {...props}>
      {numbers.map((item) => {
        return (
          <Button
            key={item}
            text={item}
            className={cn(styles.button, {
              [styles.large]: item === "0",
            })}
            disabled={!isActive}
            onClick={() => handler(item)}
          />
        );
      })}
    </div>
  );
};
