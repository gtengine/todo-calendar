import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import { getCalendarColumns } from "./src/utils";

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);
  console.log(columns.length);
  console.log(columns);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
