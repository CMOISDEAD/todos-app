import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Today, Tomorrow } from "../components/Today";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../app/todoSlice";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HideButton = ({ handleHide, isHidden }) => {
  return (
    <TouchableOpacity onPress={handleHide}>
      <Text style={{ color: "#3478f6" }}>
        {isHidden ? "Show completed" : "Hide completed"}
      </Text>
    </TouchableOpacity>
  );
};

export const Home = () => {
  const todos = useSelector((state) => state.todos.todos);
  // const [todos, setTodos] = useState([...data]);
  const [isHidden, setIsHidden] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const dataStorage = await AsyncStorage.getItem("@Todos");
        if (dataStorage != null) {
          const dbData = JSON.parse(dataStorage);
          dispatch(setTasks(dbData));
        } else {
          console.log("vacio");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getTodos();
  }, []);

  const handleHide = () => {
    if (isHidden) {
      setIsHidden(false);
      // setTodos(data);
      return;
    }
    setIsHidden(!isHidden);
    // setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  return (
    <View style={styles.container}>
      <Today todos={todos}>
        <HideButton handleHide={handleHide} isHidden={isHidden} />
      </Today>
      <Tomorrow todos={todos} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Add")}
      >
        <Text>
          <MaterialIcons name="add" color="#fff" style={styles.plus} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 50,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: "#fff",
    position: "absolute",
    top: -6,
    left: 10,
  },
});
