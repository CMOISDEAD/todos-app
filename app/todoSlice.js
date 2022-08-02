import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    title: "Take out the trash",
    time: "7:00",
    isToday: true,
    isCompleted: true,
  },
  {
    id: 1,
    title: "Clean the room",
    time: "10:00",
    isToday: false,
    isCompleted: false,
  },
  {
    id: 2,
    title: "Complete me!",
    time: "10:00",
    isToday: true,
    isCompleted: false,
  },
];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      let obj = action.payload;
      obj.id = state.length;
      state.push(obj);
    },
    removeTask: (state, action) => {
      let obj = state.findIndex((todo) => todo.id === action.payload);
      state.splice(obj, 1);
    },
    toggleTask: (state, action) => {
      let obj = state.find((item) => item.id === action.payload);
      obj.isCompleted = !obj.isCompleted;
      state.map((item) => (item.id === obj.id ? obj : item));
    },
  },
});

export const { addTask, removeTask, toggleTask } = todoSlice.actions;

export default todoSlice.reducer;
