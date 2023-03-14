import { ReactComponent as EyeIcon } from "assets/icons/eye.svg";
import { ReactComponent as SelectorIcon } from "assets/icons/selector.svg";
import { useAppDispatch, useAppSelector } from "store";
import { changeScreen, ScreenType } from "store/slices/mainSlice";
import { resetResult } from "store/slices/calculatorSlice";
import styles from "./ScreenSelect.module.scss";
import cn from "classnames";

export const ScreenSelect: React.FC = () => {
  const screen = useAppSelector((state) => state.mainSlice.activeScreen);
  const dispatch = useAppDispatch();

  const changeHandler = (screen: ScreenType) => {
    dispatch(changeScreen(screen));
    dispatch(resetResult());
  };

  return (
    <div className={styles.container}>
      <div
        className={cn({ [styles.active]: screen === ScreenType.CALCULATOR })}
        onClick={() => changeHandler(ScreenType.CALCULATOR)}
      >
        <EyeIcon />
        <p>Runtime</p>
      </div>
      <div
        className={cn({ [styles.active]: screen === ScreenType.CONSTRUCTOR })}
        onClick={() => changeHandler(ScreenType.CONSTRUCTOR)}
      >
        <SelectorIcon />
        <p>Constructor</p>
      </div>
    </div>
  );
};
