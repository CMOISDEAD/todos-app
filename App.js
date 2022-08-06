import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { AddTodo } from "./screens/AddTodo";
import { TodoView } from "./screens/TodoView";
import { ConfigView } from "./screens/ConfigView";
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
              headerShown: false,
              headerRight: () => <UserButton />,
            }}
          />
          <Stack.Screen
            name="Add"
            component={AddTodo}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="Todo"
            component={TodoView}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="Config"
            component={ConfigView}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
