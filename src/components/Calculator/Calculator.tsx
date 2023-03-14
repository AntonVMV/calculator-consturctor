import React, { useState } from "react";
import { CalculatorElements } from "components/CalculatorElements";
import { useAppSelector, useAppDispatch } from "store";
import {
  addCalcElement,
  CalculatorElems,
  removeCalcElement,
  ScreenType,
  setDraggedElement,
} from "store/slices/mainSlice";
import { CalculatorEmpty } from "./CalculatorEmpty";
import styles from "./Calculator.module.scss";

export const Calculator: React.FC = () => {
  const { activeScreen } = useAppSelector((state) => state.mainSlice);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const { calculatorElems, draggedElement } = useAppSelector(
    (state) => state.mainSlice
  );
  const dispatch = useAppDispatch();

  const removeHandler = (item: CalculatorElems) => {
    if (activeScreen === ScreenType.CALCULATOR) return;
    dispatch(removeCalcElement(item));
  };

  const dragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedElement) return;

    if (draggedElement === "display") {
      setInsertIndex(0);
    } else if (index === undefined) {
      setInsertIndex(calculatorElems.length);
    } else if (calculatorElems[index] === "display") {
      setInsertIndex(index + 1);
    } else {
      const { height, y } = (
        e.currentTarget as HTMLElement
      ).getBoundingClientRect();

      setInsertIndex(e.clientY - y < height / 2 ? index : index + 1);
    }
  };

  const dragLeave = () => {
    setInsertIndex(null);
  };

  const dragStart = (item: CalculatorElems) => {
    dispatch(setDraggedElement(item));
  };

  const dropHandler = () => {
    if (!draggedElement) return;

    dispatch(addCalcElement(insertIndex));
    setInsertIndex(null);
  };

  if (!calculatorElems.length) {
    return (
      <div onDrop={dropHandler} onDragOver={(e) => e.preventDefault()}>
        <CalculatorEmpty />
      </div>
    );
  }

  return (
    <div
      onDrop={dropHandler}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      className={styles.container}
    >
      {calculatorElems.map((item, index) => {
        return (
          <div
            key={item}
            onDoubleClick={() => removeHandler(item)}
            draggable={
              activeScreen === ScreenType.CONSTRUCTOR && item !== "display"
            }
            onDragStart={() => dragStart(item)}
            onDragOver={(e) => dragOver(e, index)}
            onDragLeave={dragLeave}
          >
            <CalculatorElements
              type={item}
              isActive={activeScreen === ScreenType.CALCULATOR}
            />
            {index === insertIndex && <div className={styles.divider} />}
          </div>
        );
      })}
      {insertIndex && insertIndex > calculatorElems.length - 1 ? (
        <div className={styles.divider} />
      ) : null}
    </div>
  );
};
