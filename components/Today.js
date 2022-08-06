import { View, Text, TouchableOpacity } from "react-native";
import { TodoList } from "../components/TodoList";
import { styles } from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { resetAll } from "../app/todoSlice";
import { useDispatch, useSelector } from "react-redux";

export const Today = ({ todos, children }) => {
  const pallete = useSelector((state) => state.config.pallete);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles(pallete).title}>Today</Text>
        {children}
      </View>
      {todos ? (
        <TodoList data={todos.filter((item) => item.isToday)} />
      ) : (
        <Text>Nothing</Text>
      )}
    </View>
  );
};

export const Tomorrow = ({ todos }) => {
  const dispatch = useDispatch();
  const pallete = useSelector((state) => state.config.pallete);

  const handleReset = async () => {
    dispatch(resetAll());
    try {
      await AsyncStorage.removeItem("@Todos");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles(pallete).title}>Tomorrow</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={{ color: "red" }}>Reset</Text>
        </TouchableOpacity>
      </View>
      {todos ? (
        <TodoList data={todos.filter((item) => !item.isToday)} />
      ) : (
        <Text>Nothing</Text>
      )}
    </View>
  );
};
