import { Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const UserButton = () => {
  const pallete = useSelector((state) => state.config.pallete);
  const data = useSelector((state) => state.todos.todos);
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("Config");
  };

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={handleClick}
    >
      <Text
        style={{
          marginRight: 10,
          fontWeight: "bold",
          color: pallete.foreground,
        }}
      >
        {data.length}
      </Text>
      <MaterialIcons
        name="account-circle"
        color={pallete.foreground_hard}
        size={35}
      />
    </TouchableOpacity>
  );
};
