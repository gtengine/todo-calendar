import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dayjs from "dayjs";
import { getCalendarColumns, getDayColor, getDayText } from "./src/utils";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const columnsSize = 40;

const Column = ({ text, color, opacity, disabled, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={{
        width: columnsSize,
        height: columnsSize,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSelected ? "#c2c2c2" : "transparent",
        borderRadius: columnsSize / 2,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ color: color, opacity: opacity }} onPress={() => {}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const ArrowButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={{ padding: 16 }} onPress={onPress}>
      <SimpleLineIcons name={name} size={16} color="black" />
    </TouchableOpacity>
  );
};

export default function App() {
  const now = dayjs();

  const [selectedDate, setSelectedDate] = useState(now);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const columns = getCalendarColumns(selectedDate);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(dayjs(date));
  };

  const onPressLeftArrow = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, "month");
    setSelectedDate(newSelectedDate);
  };

  const onPressRightArrow = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, "month");
    setSelectedDate(newSelectedDate);
  };

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

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

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
