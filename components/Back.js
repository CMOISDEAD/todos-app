import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

export const Back = () => {
  const pallete = useSelector((state) => state.config.pallete);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBack}>
      <MaterialIcons name="arrow-back" color={pallete.foreground} size={40} />
    </TouchableOpacity>
  );
};
