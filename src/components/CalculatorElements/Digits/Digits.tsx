import { HTMLAttributes } from "react";
import { Button } from "components/Shared/Button/Button";
import { ActionTypes, nextAction } from "store/slices/calculatorSlice";
import { useAppDispatch } from "store";
import styles from "./Digits.module.scss";
import cn from "classnames";

interface DigitsProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const digits: { type: ActionTypes; text: string }[] = [
  { type: "divide", text: "/" },
  { type: "mult", text: "x" },
  { type: "dif", text: "-" },
  { type: "sum", text: "+" },
];

export const Digits: React.FC<DigitsProps> = ({
  className,
  isActive = true,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const handler = (item: ActionTypes) => {
    dispatch(nextAction(item));
  };

  return (
    <div className={cn(styles.container, className)} {...props}>
      {digits.map((item) => {
        return (
          <Button
            text={item.text}
            key={item.type}
            onClick={() => handler(item.type)}
            className={styles.button}
            disabled={!isActive}
          />
        );
      })}
    </div>
  );
};
