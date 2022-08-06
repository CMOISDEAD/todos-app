import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTask } from "../app/todoSlice";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { styles } from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Checkbox = ({ id, isToday, isCompleted }) => {
  const pallete = useSelector((state) => state.config.pallete);
  const [completed, setCompleted] = useState(isCompleted);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todos.todos);

  const handleCheck = () => {
    setCompleted(!completed);
    try {
      dispatch(toggleTask(id));
      AsyncStorage.setItem(
        "@Todos",
        JSON.stringify(
          data.map((todo) => {
            if (todo.id === id) {
              return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
          })
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  return isToday ? (
    <TouchableOpacity
      style={completed ? styles(pallete).check : styles(pallete).uncheck}
      onPress={handleCheck}
    >
      {completed && (
        <Entypo name="check" size={16} color={pallete.foreground} />
      )}
    </TouchableOpacity>
  ) : (
    <View style={styles(pallete).tomorrow} />
  );
};
