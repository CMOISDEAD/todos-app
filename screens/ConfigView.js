import { useState } from "react";
import { View, Text, CheckBox, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setConfigReducer, setPalleteReducer } from "../app/configSlice";
import { useColorscheme } from "../styles/colors";
import { Back } from "../components/Back";
import { styles } from "../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

export const ConfigView = () => {
  const pallete = useSelector((state) => state.config.pallete);
  const config = useSelector((state) => state.config.theme);
  const dispatch = useDispatch();

  const [openMode, setOpenMode] = useState(false);
  const [valueMode, setValueMode] = useState(null);
  const [itemsMode, setItemsMode] = useState([
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
  ]);

  const [openColor, setOpenColor] = useState(false);
  const [valueColor, setValueColor] = useState(null);
  const [itemsColor, setItemsColor] = useState([
    { label: "Gruvbox", value: "gruvbox" },
    { label: "Solarized", value: "solarized" },
    { label: "Default", value: "Default" },
  ]);

  const handleSetConfig = async () => {
    let obj = {
      mode: valueMode,
      colorscheme: valueColor,
    };
    dispatch(setConfigReducer(obj));
    dispatch(setPalleteReducer(useColorscheme(obj)));
    try {
      await AsyncStorage.setItem("@Theme", JSON.stringify(obj));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 50,
        backgroundColor: pallete.background,
      }}
    >
      <View style={styles(pallete).box}>
        <Text
          style={[
            styles(pallete).title,
            {
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "flex-start",
            },
          ]}
        >
          <Back />
          Mode
        </Text>
        <DropDownPicker
          open={openMode}
          value={valueMode}
          items={itemsMode}
          setOpen={setOpenMode}
          setValue={setValueMode}
          setItems={setItemsMode}
        />
      </View>
      <View style={styles(pallete).box}>
        <Text style={styles(pallete).title}>Colorscheme</Text>
        <DropDownPicker
          open={openColor}
          value={valueColor}
          items={itemsColor}
          setOpen={setOpenColor}
          setValue={setValueColor}
          setItems={setItemsColor}
        />
      </View>
      <TouchableOpacity
        style={styles(pallete).configButton}
        onPress={handleSetConfig}
      >
        <Text style={{ color: pallete.background }}>Save</Text>
      </TouchableOpacity>

      <Text style={{ color: pallete.foreground }}>{config.mode}</Text>
      <Text style={{ color: pallete.foreground }}>{config.colorscheme}</Text>
    </View>
  );
};
