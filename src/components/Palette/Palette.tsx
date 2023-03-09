import { CalculatorElements } from "components/CalculatorElements";
import { useAppDispatch, useAppSelector } from "store";
import { CalculatorElems, setDraggedElement } from "store/slices/mainSlice";
import styles from "./Palette.module.scss";
import cn from "classnames";

const components = ["table", "digits", "numbers", "result"] as const;

export const Palette: React.FC = () => {
  const { calculatorElems } = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const isDisabled = (item: CalculatorElems) => {
    return calculatorElems.includes(item);
  };

  const dragStart = (item: CalculatorElems) => {
    dispatch(setDraggedElement(item));
  };

  return (
    <div className={styles.container}>
      {components.map((item, index) => {
        return (
          <div
            key={index}
            draggable
            className={cn({ [styles.disabled]: isDisabled(item) })}
            onDragStart={() => dragStart(item)}
          >
            <CalculatorElements type={item} isActive={false} />
          </div>
        );
      })}
    </div>
  );
};
