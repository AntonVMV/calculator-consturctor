import { HTMLAttributes } from "react";
import { Button } from "components/Shared/Button/Button";
import { useAppDispatch } from "store";
import { getResult } from "store/slices/calculatorSlice";
import styles from "./Result.module.scss";
import cn from "classnames";

interface ResultProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export const Result: React.FC<ResultProps> = ({
  isActive = true,
  className,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const handler = () => {
    dispatch(getResult());
  };

  return (
    <div className={cn(styles.container, className)} {...props}>
      <Button
        text="="
        className={styles.button}
        styleType="secondary"
        disabled={!isActive}
        onClick={handler}
      />
    </div>
  );
};
