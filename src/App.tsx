import { ScreenSelect } from "./components/ScreenSelect/ScreenSelect";
import { useAppSelector } from "./store";
import { Palette } from "./components/Palette/Palette";
import { Calculator } from "./components/Calculator/Calculator";
import { ScreenType } from "store/slices/mainSlice";
import styles from "./App.module.scss";

function App() {
  const screen = useAppSelector((state) => state.mainSlice.activeScreen);

  return (
    <div className={styles.container}>
      <ScreenSelect />
      <div>{screen === ScreenType.CONSTRUCTOR && <Palette />}</div>
      <div>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
