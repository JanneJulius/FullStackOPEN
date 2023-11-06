import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import { Picker } from "@react-native-picker/picker";
import theme from "../theme";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  pickerStyles: {
    width: "100%",
    backgroundColor: theme.colors.barColor,
    color: "white",
  },
  pressableStyles: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const options = [
  "Latest repositories",
  "Highest rated repositories",
  "Lowest rated repositories",
];

const Select = ({ selectedValue, setSelectedValue }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <View>
      {isPickerVisible ? (
        <View style={styles.pickerStyles}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              setSelectedValue(itemValue);
              setIsPickerVisible(false);
            }}
          >
            {options.map((o, i) => (
              <Picker.Item color="white" key={i} label={o} value={o} />
            ))}
          </Picker>
        </View>
      ) : (
        <Pressable onPress={() => setIsPickerVisible(!isPickerVisible)}>
          <View style={styles.pressableStyles}>
            <Text color="textSecondary">{selectedValue}</Text>
            <FontAwesome name="sort-down" size={16} color="white" />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Select;
