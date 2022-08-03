import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TodoList } from "../components/TodoList";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { resetAll } from "../app/todoSlice";
import { useDispatch } from "react-redux";

export const Today = ({ todos, children }) => {
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
        <Text style={styles.title}>Today</Text>
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
        <Text style={styles.title}>Tomorrow</Text>
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

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 35,
    marginTop: 10,
  },
});
