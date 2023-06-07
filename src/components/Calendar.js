import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";

import { getDayColor, getDayText } from "../utils";
import ArrowButton from "./ArrowButton";
import Column from "./Column";

export default ({
  todoList,
  selectedDate,
  onPressLeftArrow,
  onPressHeaderDate,
  onPressRightArrow,
  onPressDate,
  columns,
  hasTodo,
}) => {
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
          <TouchableOpacity onPress={onPressHeaderDate}>
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
    const onPress = () => onPressDate(date);
    const hasTodo = todoList.find((todo) =>
      dayjs(todo.date).isSame(dayjs(date), "date")
    );

    return (
      <Column
        text={dateText}
        color={getDayColor(day)}
        opacity={isCurrentMonth ? 1 : 0.4}
        isSelected={isSelected}
        onPress={onPress}
        hasTodo={hasTodo}
      />
    );
  };
  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      data={columns}
      renderItem={renderItem}
      numColumns={7}
      scrollEnabled={false}
    />
  );
};
