import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { ICON_SIZE } from "../utils";

export default ({ name, onPress }) => {
  return (
    <TouchableOpacity style={{ padding: 16 }} onPress={onPress}>
      <SimpleLineIcons name={name} size={ICON_SIZE} color="black" />
    </TouchableOpacity>
  );
};
