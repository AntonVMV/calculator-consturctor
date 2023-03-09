import React, { useState } from "react";
import { CalculatorElements } from "components/CalculatorElements";
import { useAppSelector, useAppDispatch } from "store";
import {
  addCalcElement,
  CalculatorElems,
  removeCalcElement,
  setDraggedElement,
} from "store/slices/mainSlice";
import { CalculatorEmpty } from "./CalculatorEmpty";
import styles from "./Calculator.module.scss";

interface CalculatorProps {
  isRuntime: boolean;
}

export const Calculator: React.FC<CalculatorProps> = ({ isRuntime }) => {
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const { calculatorElems, draggedElement } = useAppSelector(
    (state) => state.mainSlice
  );
  const dispatch = useAppDispatch();

  const removeHandler = (item: CalculatorElems) => {
    if (isRuntime) return;
    dispatch(removeCalcElement(item));
  };

  const dragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedElement) return;

    if (draggedElement === "table") {
      setInsertIndex(null);
    } else if (index === undefined) {
      setInsertIndex(calculatorElems.length - 1);
    } else {
      setInsertIndex(index);
    }
  };

  const dragLeave = (e: React.DragEvent) => {
    setInsertIndex(null);
  };

  const dragStart = (item: CalculatorElems) => {
    dispatch(setDraggedElement(item));
  };

  const dropHandler = () => {
    if (!draggedElement) return;

    if (
      insertIndex !== null &&
      calculatorElems.indexOf(draggedElement) === insertIndex
    ) {
      dispatch(addCalcElement(insertIndex));
    } else {
      dispatch(addCalcElement(insertIndex !== null ? insertIndex + 1 : null));
    }

    setInsertIndex(null);
  };

  if (!calculatorElems.length) {
    return (
      <div onDrop={dropHandler} onDragOver={(e) => e.preventDefault()}>
        <CalculatorEmpty />;
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
            key={index}
            onDoubleClick={() => removeHandler(item)}
            draggable={!isRuntime && item !== "table"}
            onDragStart={() => dragStart(item)}
            onDragOver={(e) => dragOver(e, index)}
          >
            <CalculatorElements key={index} type={item} isActive={isRuntime} />
            {index === insertIndex && <div className={styles.divider} />}
          </div>
        );
      })}
    </div>
  );
};
