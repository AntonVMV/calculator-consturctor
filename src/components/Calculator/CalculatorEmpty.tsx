import { ReactComponent as ImgIcon } from "assets/icons/image.svg";
import React from "react";
import styles from "./Calculator.module.scss";

export const CalculatorEmpty: React.FC = () => {
  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "#F0F9FF";
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div
      className={styles.empty}
      onDragOver={(e) => dragOver(e)}
      onDragLeave={(e) => dragLeave(e)}
    >
      <ImgIcon />
      <p>Перетащите сюда</p>
      <p>
        любой элемент <br /> из левой панели
      </p>
    </div>
  );
};
