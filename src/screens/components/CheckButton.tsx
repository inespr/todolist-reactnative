import React from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CheckButtonProps from '../interfaces/CheckButtonProps';

export const CheckButton = ({ isChecked, onCheck }: CheckButtonProps) => {
  const handlePress = () => {
    onCheck(!isChecked);
  };
  return (
    <>
    <TouchableOpacity
        style={[
          style.button,
          {
            backgroundColor: isChecked ? "blue" : "green",
          },
        ]}
        onPress={handlePress}
      >
        {isChecked ? (
          <View style={style.wrapperButton}>
            <AiFillCloseCircle style={{ width: "30px", height: "30px" }} />{" "}
            <AiFillCheckCircle
              style={{
                width: "30px",
                height: "30px",
                visibility: "hidden",
              }}
            />
          </View>
        ) : (
          <View style={style.wrapperButton}>
            {" "}
            <AiFillCloseCircle
              style={{
                width: "30px",
                height: "30px",
                visibility: "hidden",
              }}
            />{" "}
            <AiFillCheckCircle style={{ width: "30px", height: "30px" }} />
          </View>
        )}
      </TouchableOpacity>
    </>
  )
};
const style = StyleSheet.create({
  button: {
    color: "white",
    backgroundColor: "#366EFF",
    flexDirection: "row",
    height: "fit-content",
    padding: "1px",
    alignItems: "center",
    borderRadius: 15,
  },
  wrapperButton: { flexDirection: "row", width: "fit-content", alignContent:'center'},
})
