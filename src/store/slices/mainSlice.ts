import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CalculatorElems = "display" | "operators" | "result" | "numbers";

// type ScreenType = "constructor" | "calculator";
export enum ScreenType {
  CONSTRUCTOR,
  CALCULATOR,
}

interface IState {
  activeScreen: ScreenType;
  draggedElement: CalculatorElems | null;
  calculatorElems: CalculatorElems[];
}

const initialState: IState = {
  activeScreen: ScreenType.CONSTRUCTOR,
  draggedElement: null,
  calculatorElems: [],
};

const mainSlice = createSlice({
  initialState,
  name: "mainSlice",
  reducers: {
    changeScreen: (state, { payload }: PayloadAction<ScreenType>) => {
      state.activeScreen = payload;
    },
    addCalcElement: (state, { payload }: PayloadAction<number | null>) => {
      if (!state.draggedElement) return;

      const isDraggedInArray = state.calculatorElems.indexOf(
        state.draggedElement
      );

      if (isDraggedInArray === payload) return;

      if (state.draggedElement === "display") {
        state.calculatorElems = ["display", ...state.calculatorElems];
      } else {
        if (isDraggedInArray > -1) {
          state.calculatorElems.splice(isDraggedInArray, 1);
        }
        state.calculatorElems.splice(payload || 0, 0, state.draggedElement);
      }
    },
    removeCalcElement: (state, { payload }: PayloadAction<CalculatorElems>) => {
      const index = state.calculatorElems.indexOf(payload);
      if (index > -1) {
        state.calculatorElems.splice(index, 1);
      }
    },
    setDraggedElement: (
      state,
      { payload }: PayloadAction<CalculatorElems | null>
    ) => {
      state.draggedElement = payload;
    },
  },
});

export default mainSlice.reducer;

export const {
  changeScreen,
  addCalcElement,
  removeCalcElement,
  setDraggedElement,
} = mainSlice.actions;
