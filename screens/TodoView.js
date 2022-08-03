import { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

export const TodoView = ({ route }) => {
  const { id } = route.params;
  const data = useSelector((state) => state.todos.todos);
  const [todo] = useState(data.find((todo) => todo.id == id));

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.title}>Title:</Text>
        <Text style={styles.title2}>{todo.title}</Text>
      </View>
      <View style={styles.containerCol}>
        <Text style={styles.title}>Description:</Text>
        <Text style={{ paddingBottom: 20 }}>
          {todo.description ? todo.description : "No description."}
        </Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.title}>Date:</Text>
        <Text style={styles.title2}>
          {todo.isToday ? "today" : "tomorrow"} at {todo.time}
        </Text>
      </View>
      <View style={styles.containerRow}>
        <Text style={styles.title}>Todo status:</Text>
        <Text style={styles.title2}>
          {todo.isCompleted ? "Completed" : "Uncompleted"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
});
