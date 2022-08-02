import { FlatList } from "react-native";
import { Todo } from "./Todo";

export const TodoList = ({ data }) => {
  return (
    <FlatList
      data={data.sort((a, b) => a.isCompleted - b.isCompleted)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Todo {...item} />}
    />
  );
};
