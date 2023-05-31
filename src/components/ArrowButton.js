import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default ({ name, onPress }) => {
  return (
    <TouchableOpacity style={{ padding: 16 }} onPress={onPress}>
      <SimpleLineIcons name={name} size={16} color="black" />
    </TouchableOpacity>
  );
};
