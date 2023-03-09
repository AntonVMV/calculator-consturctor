import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CalculatorElems = "table" | "digits" | "result" | "numbers";

type ScreenType = "constructor" | "calculator";

interface IState {
  activeScreen: ScreenType;
  draggedElement: CalculatorElems | null;
  calculatorElems: CalculatorElems[];
}

const initialState: IState = {
  activeScreen: "constructor",
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

      if (state.draggedElement === "table") {
        state.calculatorElems = ["table", ...state.calculatorElems];
      } else {
        if (isDraggedInArray > 0) {
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
