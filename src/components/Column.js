import { Text, TouchableOpacity } from "react-native";

const columnsSize = 40;

export default ({
  text,
  color,
  opacity,
  disabled,
  onPress,
  isSelected,
  hasTodo,
}) => {
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
      <Text
        style={{ color, opacity, fontWeight: hasTodo ? "bold" : "normal" }}
        onPress={onPress}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
