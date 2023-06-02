import { TextInput, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { ICON_SIZE, TODO_WIDTH } from "../utils";

export default ({ value, placeholder, onChangeText, onPressAdd, onFocus }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: TODO_WIDTH,
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <TextInput
        style={{ flex: 1, padding: 8 }}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={onPressAdd} // 엔터키 눌러도 핸들러 작동
        blurOnSubmit={false} // submit이 끝나도 키보드가 닫히지 않음
        onFocus={onFocus}
      />
      <TouchableOpacity style={{ padding: 8 }} onPress={onPressAdd}>
        <Entypo name="add-to-list" size={ICON_SIZE} color="black" />
      </TouchableOpacity>
    </View>
  );
};
