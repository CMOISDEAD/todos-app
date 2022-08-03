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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const AddTodo = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const data = useSelector((state) => state.todos.todos);

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

  const handleAdd = async () => {
    let uniqueId = uuidv4();
    console.log(uniqueId);
    let todo = {
      id: uniqueId,
      title: name,
      description,
      time: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isToday,
      isCompleted: false,
    };
    try {
      const value = JSON.stringify([...data, todo]);
      await AsyncStorage.setItem("@Todos", value);
      dispatch(addTask(todo));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
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
      <View
        style={{
          flexDirection: "column",
          paddingBottom: 30,
        }}
      >
        <Text style={styles.inputTitle}>Description *</Text>
        <TextInput
          style={styles.inputTextArea}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={5}
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
  inputTextArea: {
    borderBottomColor: "#00000053",
    borderBottomWidth: 1,
    width: "100%",
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
