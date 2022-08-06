import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Today, Tomorrow } from "../components/Today";
import { UserButton } from "../components/UserButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../app/todoSlice";
import { setConfigReducer, setPalleteReducer } from "../app/configSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorscheme } from "../styles/colors";
import { styles } from "../styles/styles";
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
  const pallete = useSelector((state) => state.config.pallete);
  const todos = useSelector((state) => state.todos.todos);
  const [isHidden, setIsHidden] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const themeStorage = await AsyncStorage.getItem("@Theme");
        if (themeStorage != null) {
          let dbData = JSON.parse(themeStorage);
          const pallete = useColorscheme(dbData);
          dispatch(setPalleteReducer(pallete));
          dispatch(setConfigReducer(dbData));
        } else {
          console.log("no config found");
        }
        const dataStorage = await AsyncStorage.getItem("@Todos");
        if (dataStorage != null) {
          let dbData = JSON.parse(dataStorage);
          dispatch(setTasks(dbData));
        } else {
          console.log("no todos found");
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
    <View style={styles(pallete).container}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <UserButton />
      </View>
      <Today todos={todos}>
        <HideButton handleHide={handleHide} isHidden={isHidden} />
      </Today>
      <Tomorrow todos={todos} />
      <TouchableOpacity
        style={styles(pallete).button}
        onPress={() => navigation.navigate("Add")}
      >
        <Text>
          <MaterialIcons name="add" style={styles(pallete).plus} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
