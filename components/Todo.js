import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Checkbox } from "./Checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { removeTask } from "../app/todoSlice";

export const Todo = ({
  id,
  title,
  // description,
  time,
  isToday,
  isCompleted,
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTask(id));
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
