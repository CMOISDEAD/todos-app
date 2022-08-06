import { useState } from "react";
import { useSelector } from "react-redux";
import { styles } from "../styles/styles";
import { Back } from "../components/Back";
import { View, Text } from "react-native";

export const TodoView = ({ route }) => {
  const pallete = useSelector((state) => state.config.pallete);
  const { id } = route.params;
  const data = useSelector((state) => state.todos.todos);
  const [todo] = useState(data.find((todo) => todo.id == id));

  return (
    <View style={styles(pallete).container}>
      <Back />
      <View style={styles(pallete).containerRow}>
        <Text style={styles(pallete).title}>Title:</Text>
        <Text style={styles(pallete).title2}>{todo.title}</Text>
      </View>
      <View>
        <Text style={styles(pallete).title}>Description:</Text>
        <Text style={{ paddingBottom: 20, color: pallete.foreground }}>
          {todo.description ? todo.description : "No description."}
        </Text>
      </View>

      <View style={styles(pallete).containerRow}>
        <Text style={styles(pallete).title}>Date:</Text>
        <Text style={styles(pallete).title2}>
          {todo.isToday ? "today" : "tomorrow"} at {todo.time}
        </Text>
      </View>
      <View style={styles(pallete).containerRow}>
        <Text style={styles(pallete).title}>Todo status:</Text>
        <Text style={styles(pallete).title2}>
          {todo.isCompleted ? "Completed" : "Uncompleted"}
        </Text>
      </View>
    </View>
  );
};
