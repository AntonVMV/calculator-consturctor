import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ActionTypes = "sum" | "dif" | "mult" | "divide";

const action = (action: ActionTypes, num1: number, num2: number) => {
  switch (action) {
    case "sum":
      return num1 + num2;
    case "dif":
      return num1 - num2;
    case "mult":
      return num1 * num2;
    case "divide":
      return num1 / num2;
  }
};

interface IInitialState {
  result: number;
  input: string;
  prevInput: string;
  nextAction: ActionTypes | null;
  prevAction: ActionTypes | null;
}

const initialState: IInitialState = {
  result: 0,
  input: "0",
  prevInput: "",
  nextAction: null,
  prevAction: null,
};

const calculatorSlice = createSlice({
  name: "calculatorSlice",
  initialState,
  reducers: {
    resetResult: (state) => {
      state.result = 0;
      state.input = "0";
      state.nextAction = null;
      state.prevAction = null;
    },
    nextAction: (state, { payload }: PayloadAction<ActionTypes>) => {
      if (state.prevInput) {
        state.prevInput = "";
        state.prevAction = null;
      }

      if (state.prevAction) {
        const parsed = parseFloat(state.input);

        const result = action(state.prevAction, state.result, parsed);

        state.result = result;
        state.input = `${result}`;
      }

      state.prevAction = null;
      state.nextAction = payload;
    },
    inputEnter: (state, { payload }: PayloadAction<string>) => {
      if (state.input === "0" && payload === "0") return;

      if (state.input.includes(".") && payload === ".") return;

      if ((state.input === "0" && payload !== ".") || state.nextAction) {
        state.result = parseFloat(state.input);
        state.input = "";
        state.prevAction = state.nextAction;
        state.nextAction = null;
      }

      if (state.prevInput) {
        state.prevInput = "";
        state.prevAction = null;
      }

      state.input += payload;
    },
    getResult: (state) => {
      if (!state.prevInput) state.prevInput = state.input;

      state.nextAction = state.prevAction;

      if (state.nextAction) {
        const parsed = parseFloat(state.prevInput);

        const result = action(state.nextAction, state.result, parsed);

        state.result = +result.toFixed(8);
        state.input = `${result}`;
      }
    },
  },
});

export default calculatorSlice.reducer;

export const { resetResult, inputEnter, nextAction, getResult } =
  calculatorSlice.actions;
