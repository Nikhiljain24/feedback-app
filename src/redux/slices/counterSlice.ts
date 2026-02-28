import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    totalFeedback: number;
}

const initialState: CounterState = {
    value: 0,
    totalFeedback: 0,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        setTotalFeedback: (state, action: PayloadAction<number>) => {
            state.totalFeedback = action.payload;
        },

    },
});

export const { increment, decrement, incrementByAmount, setTotalFeedback } = counterSlice.actions;

export default counterSlice.reducer;
