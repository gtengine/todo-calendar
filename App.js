import dayjs from "dayjs";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ArrowButton from "./src/components/ArrowButton";
import Column from "./src/components/Column";
import { useCalendar } from "./src/hooks/use-calendar";
import { getCalendarColumns, getDayColor, getDayText } from "./src/utils";

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

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD.");
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton name="arrow-left" onPress={onPressLeftArrow} />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: "#404040" }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>
          <ArrowButton name="arrow-right" onPress={onPressRightArrow} />
        </View>

        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day, idx) => {
            return (
              <Column
                key={idx}
                text={getDayText(day)}
                color={getDayColor(day)}
                opacity={1}
                disabled
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const isCurrentMonth = dayjs(date).isSame(selectedDate, "month");
    const isSelected = dayjs(date).isSame(selectedDate, "date");
    const onPress = () => {
      setSelectedDate(date);
    };
    return (
      <Column
        text={dateText}
        color={getDayColor(day)}
        opacity={isCurrentMonth ? 1 : 0.4}
        isSelected={isSelected}
        onPress={onPress}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(_, idx) => idx}
        ListHeaderComponent={ListHeaderComponent}
        data={columns}
        renderItem={renderItem}
        numColumns={7}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
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
