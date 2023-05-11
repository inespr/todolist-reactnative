import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { CheckButton } from "./CheckButton";

export const Task = ({ title, description }) => {
  
  const [clicked, setClicked] = useState(true);

  return (
    <>
      <View style={style.taskWrapper}>
        <View style={style.decorationLine}></View>
        <View style={style.textAndButtonWrapper}>
          <View style={style.textsWrapper}>
            <Text
              style={[
                style.taskTitle,
                { textDecorationLine: clicked ? "none" : "line-through" },
              ]}
            >
              {title}
            </Text>
            <Text style={style.description} numberOfLines={1}>
              {description}
            </Text>
          </View>
          <CheckButton clicked={clicked} setClicked={setClicked} />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  taskWrapper: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
  textsWrapper: { flex: 1 },
  textAndButtonWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  decorationLine: {
    backgroundColor: "green",
    width: "6px",
    borderRadius: 10,
  },
  taskTitle: { color: "white", fontSize: 25 },
  description: {
    color: "white",
  },
});
