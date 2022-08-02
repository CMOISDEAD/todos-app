import { View, Text, StyleSheet } from "react-native";
import { TodoList } from "../components/TodoList";

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
      <TodoList data={todos.filter((item) => item.isToday)} />
    </View>
  );
};

export const Tomorrow = ({ todos }) => {
  return (
    <View>
      <Text style={styles.title}>Tomorrow</Text>
      <TodoList data={todos.filter((item) => !item.isToday)} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
});
