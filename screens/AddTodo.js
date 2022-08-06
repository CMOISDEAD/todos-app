import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Switch } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../app/todoSlice";
import { Back } from "../components/Back";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/styles";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const AddTodo = () => {
  const pallete = useSelector((state) => state.config.pallete);
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
    <View style={styles(pallete).container}>
      <Text style={styles(pallete).title}>
        <Back />
        Add Task
      </Text>
      <View style={styles(pallete).inputContainer}>
        <Text style={styles(pallete).inputTitle}>Title</Text>
        <TextInput
          style={styles(pallete).inputText}
          placeholder="Task"
          placeholderTextColor={pallete.blue}
          onChange={(text) => setName(text)}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          paddingBottom: 30,
        }}
      >
        <Text style={styles(pallete).inputTitle}>Description *</Text>
        <TextInput
          style={styles(pallete).inputTextArea}
          placeholder="Description"
          placeholderTextColor={pallete.blue}
          onChange={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={5}
        />
      </View>

      <View style={styles(pallete).inputContainer}>
        <Text style={styles(pallete).inputTitle}>Hour</Text>
        <TouchableOpacity onPress={handleDate}>
          <Text style={{ color: pallete.foreground }}>
            {date.toLocaleTimeString()}
          </Text>
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
      <View style={styles(pallete).inputContainer}>
        <Text style={styles(pallete).inputTitle}>Today</Text>
        <Switch value={isToday} onValueChange={(value) => setIsToday(value)} />
      </View>
      <TouchableOpacity
        style={
          name != ""
            ? styles(pallete).buttonWide
            : [styles(pallete).buttonWide, styles(pallete).disableButton]
        }
        onPress={handleAdd}
        disabled={name == ""}
      >
        <Text style={{ color: pallete.green }}>Done</Text>
      </TouchableOpacity>
      <Text style={{ color: `${pallete.foreground}30`, textAlign: "center" }}>
        If you disable today, the task will be consider as tomorrow.
      </Text>
    </View>
  );
};
