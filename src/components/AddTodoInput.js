import { TextInput, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { ICON_SIZE, TODO_WIDTH, bottomSpace } from "../utils";

export default ({ value, placeholder, onChangeText }) => {
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
      />
      <TouchableOpacity style={{ padding: 8 }}>
        <Entypo name="add-to-list" size={ICON_SIZE} color="black" />
      </TouchableOpacity>
    </View>
  );
};
