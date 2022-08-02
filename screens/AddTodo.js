import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../app/todoSlice";

export const AddTodo = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.todos);

  const handleChange = (_event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  const handleDate = () => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setShow(true);
  };

  const handleAdd = () => {
    dispatch(
      addTask({
        id: 0,
        title: name,
        time: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isToday,
        isCompleted: false,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Title</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Task"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hour</Text>
        <TouchableOpacity onPress={handleDate}>
          <Text>{date.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Today</Text>
        <Switch value={isToday} onValueChange={(value) => setIsToday(value)} />
      </View>
      <TouchableOpacity
        style={
          name != "" ? styles.button : [styles.button, styles.disableButton]
        }
        onPress={handleAdd}
        disabled={name == ""}
      >
        <Text style={{ color: "white" }}>Done</Text>
      </TouchableOpacity>
      <Text style={{ color: "#00000060", textAlign: "center" }}>
        If you disable today, the task will be consider as tomorrow.
      </Text>
      <View>
        {data.map((todo, i) => {
          return <Text key={i}>{todo.title}</Text>;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 24,
  },
  inputText: {
    borderBottomColor: "#00000053",
    borderBottomWidth: 1,
    width: "80%",
  },
  button: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
  disableButton: {
    backgroundColor: "#26262640",
  },
});
