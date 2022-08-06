import { Text, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./Checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { removeTask } from "../app/todoSlice";
import { styles } from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Todo = ({ id, title, time, isToday, isCompleted }) => {
  const pallete = useSelector((state) => state.config.pallete);
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
    <TouchableOpacity
      style={styles(pallete).todoContainer}
      onPress={handleNavigate}
    >
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
              isCompleted
                ? [styles(pallete).todoName, styles(pallete).completed]
                : styles(pallete).todoName
            }
          >
            {title}
          </Text>
          <Text
            style={
              isCompleted
                ? [styles(pallete).time, styles(pallete).completed]
                : styles(pallete).time
            }
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
