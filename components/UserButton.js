import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const UserButton = () => {
  const data = useSelector((state) => state.todos.todos);
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={{ marginRight: 10, fontWeight: "bold" }}>{data.length}</Text>
      <Image
        source={{
          uri: "https://www.infobae.com/new-resizer/1rR8dp3xRuvqjdgp0xjGZM98hCU=/1200x900/filters:format(webp):quality(85)//s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/06/07195040/iStock-92315435.jpg",
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});
