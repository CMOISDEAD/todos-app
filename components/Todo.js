import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./Checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { removeTask } from "../app/todoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Todo = ({ id, title, time, isToday, isCompleted }) => {
  const data = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDelete = async () => {
    dispatch(removeTask(id));
    try {
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify(data.filter((todo) => todo.id !== id))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleNavigate = () => {
    // Alert.alert("todo id", id);
    navigation.navigate("Todo", { id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          id={id}
          title={title}
          time={time}
          isToday={isToday}
          isCompleted={isCompleted}
        />
        <View>
          <Text
            style={
              isCompleted ? [styles.title, styles.completed] : styles.title
            }
          >
            {title}
          </Text>
          <Text
            style={isCompleted ? [styles.time, styles.completed] : styles.time}
          >
            {time}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <MaterialIcons name="delete-outline" size={24} color="#73737340" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: "#ffffff50",
    borderWidth: 1,
    borderColor: "#26262610",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#262626",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#26262630",
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    color: "#262626",
  },
  time: {
    fontSize: 13,
    color: "#262626",
    fontWeight: "500",
  },
});
