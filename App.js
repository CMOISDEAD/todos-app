import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { AddTodo } from "./screens/AddTodo";
import { UserButton } from "./components/UserButton";
import { store } from "./app/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
              headerRight: () => <UserButton />,
            }}
          />
          <Stack.Screen
            name="Add"
            component={AddTodo}
            options={{
              headerShown: true,
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
