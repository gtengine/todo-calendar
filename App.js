import dayjs from "dayjs";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

import Calendar from "./src/components/Calendar";
import { useCalendar } from "./src/hooks/use-calendar";
import { useTodoList } from "./src/hooks/use-todo-list";
import {
  ICON_SIZE,
  TODO_WIDTH,
  bottomSpace,
  getCalendarColumns,
  statusBarHeight,
} from "./src/utils";
import AddTodoInput from "./src/components/AddTodoInput";

export default function App() {
  const now = dayjs();

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);

  const { todoList, addTodo, removeTodo, toggleTodo, input, setInput } =
    useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const onPressAdd = () => {};

  const ListHeaderComponent = () => {
    return (
      <View>
        <Calendar
          selectedDate={selectedDate}
          onPressLeftArrow={onPressLeftArrow}
          onPressHeaderDate={onPressHeaderDate}
          onPressRightArrow={onPressRightArrow}
          onPressDate={onPressDate}
          columns={columns}
        />
        <View style={{ marginTop: 16 }} />
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 8 / 2,
            backgroundColor: "#a3a3a3",
            alignSelf: "center",
          }}
        />
        <View style={{ marginTop: 16 }} />
      </View>
    );
  };

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: TODO_WIDTH,
          alignSelf: "center",
          paddingHorizontal: 4,
          paddingVertical: 12,
          borderBottomWidth: 0.3,
          borderBottomColor: "#292929",
        }}
      >
        <Text style={{ flex: 1, fontSize: 16, color: "black" }}>
          {todo.content}
        </Text>

        <Ionicons
          name="checkmark"
          size={ICON_SIZE}
          color={isSuccess ? "green" : "red"}
        />
      </View>
    );
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={require("./assets/mkarina1.jpeg")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.3,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <>
          <FlatList
            keyExtractor={(_, idx) => idx}
            data={todoList}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{ paddingTop: statusBarHeight }}
          />
          <AddTodoInput
            value={input}
            placeholder={`${dayjs(selectedDate).format(
              "M.D"
            )}에 할 일을 입력하세요.`}
            onChangeText={setInput}
          />
        </>
      </KeyboardAvoidingView>

      <View style={{ height: bottomSpace }} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
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
