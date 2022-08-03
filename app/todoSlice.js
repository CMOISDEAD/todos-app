import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: "55af1e37-0734-46d8-b070-a1e42e4fc392",
      title: "vacio",
      description: "holax",
      time: "12",
      isToday: true,
      isCompleted: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.todos = action.payload;
    },
    addTask: (state, action) => {
      let obj = action.payload;
      state.todos.push(obj);
    },
    removeTask: (state, action) => {
      let obj = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(obj, 1);
    },
    toggleTask: (state, action) => {
      let obj = state.todos.find((item) => item.id === action.payload);
      obj.isCompleted = !obj.isCompleted;
      state.todos.map((item) => (item.id === obj.id ? obj : item));
    },
    resetAll: (state, action) => {
      state.todos.map((item, i) => (item.id = i));
    },
  },
});

export const { setTasks, addTask, removeTask, toggleTask, resetAll } =
  todoSlice.actions;

export default todoSlice.reducer;
