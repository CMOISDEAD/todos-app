import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTask } from "../app/todoSlice";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

export const Checkbox = ({ id, isToday, isCompleted }) => {
  const [completed, setCompleted] = useState(isCompleted);
  const dispatch = useDispatch();

  const handleCheck = () => {
    setCompleted(!completed);
    dispatch(toggleTask(id));
  };

  return isToday ? (
    <TouchableOpacity
      style={completed ? styles.check : styles.uncheck}
      onPress={handleCheck}
    >
      {completed && <Entypo name="check" size={16} color={"#fff"} />}
    </TouchableOpacity>
  ) : (
    <View style={styles.tomorrow} />
  );
};

const styles = StyleSheet.create({
  check: {
    width: 20,
    height: 20,
    marginRight: 13,
    marginLeft: 15,
    borderRadius: 6,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  uncheck: {
    width: 20,
    height: 20,
    marginRight: 13,
    marginLeft: 15,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#fff",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  tomorrow: {
    width: 10,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#262626",
    marginRight: 13,
    marginLeft: 13,
  },
});
